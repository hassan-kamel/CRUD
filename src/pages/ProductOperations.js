/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
const ProductOperations = () => {
  const navigate = useNavigate();
  //determine what the operation
  const { opID, productID } = useParams();
  // console.log('productID: ', productID);
  // console.log('opID: ', opID);
  const operation = opID === '1' ? 'Add New' : 'Update';
  //refrences
  const form = useRef();
  const submitButton = useRef();
  const loadingButton = useRef();
  const titleInput = useRef();
  const priceInput = useRef();
  const descriptionInput = useRef();
  const categoryIdInput = useRef();
  const imageInput = useRef();
  // state of the data they we will post it
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState({});
  //handle buttons
  const loading = () => {
    submitButton.current.classList.toggle('hidden');
    loadingButton.current.classList.toggle('hidden');
  };
  // handle Inputs
  useEffect(() => {
    if (operation !== 'Add New') {
      fetch(`https://api.escuelajs.co/api/v1/products/${productID}`)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
        });
    }
  }, []);
  useEffect(() => {
    handleInputs();
  }, [product]);
  const handleInputs = () => {
    if (operation === 'Update') {
      if (priceInput.current) {
        titleInput.current.value = product.title;
        setTitle(product.title);
        priceInput.current.value = product.price;
        setPrice(product.price);
        descriptionInput.current.value = product.description;
        setDescription(product.description);
        categoryIdInput.current.value = product.category?.id;
        setCategoryId(product.category?.id);
        imageInput.current.value = product.images;
        setImages(product.images);
      }
    }
  };
  // handle uploading new product
  const productAction = (e) => {
    e.preventDefault();
    loading();
    const productObj = {
      title,
      price,
      description,
      categoryId,
      images,
    };
    console.log('product: ', product);
    const URL =
      operation === 'Add New'
        ? 'https://api.escuelajs.co/api/v1/products/'
        : `https://api.escuelajs.co/api/v1/products/${product.id}`;
    const METHOD = operation === 'Add New' ? 'POST' : 'PUT';
    fetch(URL, {
      method: METHOD,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(productObj),
    })
      .then((response) => response.json())
      .then((message) => {
        form.current.reset();
        swal({
          title: 'Good job!',
          text:
            operation === 'Add New'
              ? 'You added a new product'
              : 'You ubdaet the product',
          icon: 'success',
          button: 'Aww yiss!',
        });
        loading();
        operation !== 'Add New' ? navigate('/products') : console.log('');
      });
  };
  //DOM
  return (
    <form
      ref={form}
      onSubmit={(e) => {
        productAction(e);
      }}
      className='container mx-auto'>
      <h1 className='mb-4 text-4xl font-extrabold tracking-tight text-center leading-none text-red-400 md:text-5xl lg:text-6xl bg-gray-100 py-3 px-4 rounded-md shadow-md'>
        {operation} Product
      </h1>
      <div className='grid gap-6 mb-6 md:grid-cols-2'>
        <div>
          <label
            htmlFor='title'
            className='block mb-2 text-sm font-medium text-gray-900 '>
            Title
          </label>
          <input
            ref={titleInput}
            type='text'
            id='title'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 '
            placeholder='iPhone'
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            htmlFor='price'
            className='block mb-2 text-sm font-medium text-gray-900 '>
            Price
          </label>
          <input
            ref={priceInput}
            type='number'
            id='price'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 '
            placeholder='10$'
            required
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            htmlFor='desc'
            className='block mb-2 text-sm font-medium text-gray-900 '>
            Description
          </label>
          <textarea
            ref={descriptionInput}
            id='desc'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5'
            placeholder='descripe the product'
            required
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            htmlFor='category'
            className='block mb-2 text-sm font-medium text-gray-900 '>
            CategoryID
          </label>
          <input
            ref={categoryIdInput}
            type='number'
            id='category'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5'
            placeholder='1-2-3-4'
            required
            onChange={(e) => {
              setCategoryId(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            htmlFor='image'
            className='block mb-2 text-sm font-medium text-gray-900 '>
            Image URL
          </label>
          <input
            ref={imageInput}
            type='url'
            id='image'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5'
            placeholder='https://placeimg.com/640/480/any'
            required
            onChange={(e) => {
              setImages([e.target.value]);
            }}
          />
        </div>
      </div>
      <button
        ref={submitButton}
        type='submit'
        className='text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
        {operation} Product
      </button>
      <button
        ref={loadingButton}
        disabled
        type='submit'
        className='hidden py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 '>
        <svg
          aria-hidden='true'
          role='status'
          className='inline mr-2 w-4 h-4 text-gray-200 animate-spin'
          viewBox='0 0 100 101'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
            fill='currentColor'
          />
          <path
            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
            fill='#1C64F2'
          />
        </svg>
        Loading...
      </button>
    </form>
  );
};

export default ProductOperations;
