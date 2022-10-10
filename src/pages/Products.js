import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
//products page
const Products = () => {
  //state for products
  const [products, setProducts] = useState([]);
  //getting date from an api
  useEffect(() => {
    getAllProducts();
  }, []);
  //get all products function
  const getAllProducts = () => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  };
  //delete product function
  const deleteProduct = (productID) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover it!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`https://api.escuelajs.co/api/v1/products/${productID}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((message) => {
            console.log('message: ', message);
            getAllProducts();
          });

        swal('Poof! Your product has been deleted!', {
          icon: 'success',
        });
      } else {
        swal('Your product is safe!');
      }
    });
  };
  // The DOM of the  products page
  return (
    <>
      <table className='table p-1 md:p-4  bg-white shadow-md rounded-lg  max-w-5xl'>
        <thead>
          <tr>
            <th className='border p-1 md:p-4  text-sm md:text-lg whitespace-nowrap font-medium text-gray-900 uppercase'>
              ID
            </th>
            <th className='border p-1 md:p-4  text-sm md:text-lg whitespace-nowrap font-medium text-gray-900 uppercase w-1/4'>
              Title
            </th>
            <th className='border p-1 md:p-4  text-sm md:text-lg whitespace-nowrap font-medium text-gray-900 uppercase'>
              Price
            </th>
            <th className='border p-1 md:p-4  text-sm md:text-lg whitespace-nowrap font-medium text-gray-900 uppercase'>
              category
            </th>
            <th className='border p-1 md:p-4  text-sm md:text-lg whitespace-nowrap font-medium text-gray-900'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => {
              return (
                <tr key={product.id} className='text-gray-700 '>
                  <td className='border p-1 md:p-4  text-sm sm:text-lg'>
                    {product.id}
                  </td>
                  <td className='border p-1 md:p-4  text-sm sm:text-lg '>
                    {product.title}
                  </td>
                  <td className='border p-1 md:p-4  text-sm sm:text-lg'>
                    {product.price}$
                  </td>
                  <td className='border p-1 md:p-4  text-sm sm:text-lg'>
                    {product.category.name}
                  </td>
                  <td className='border-t p-1 text-sm sm:text-lg'>
                    <div className='cta'>
                      <button
                        onClick={() => {
                          deleteProduct(product.id);
                        }}
                        type='button'
                        className='my-1 py-[2px] px-[4px]  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
                        Delete
                      </button>

                      <Link
                        to={`/products/${product.id}`}
                        type='button'
                        className='py-[2px] px-[4px]  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
                        View
                      </Link>

                      <Link
                        to={`/products/actions/${product.id}/2`}
                        type='button'
                        className='my-1 py-[2px] px-[4px]  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Products;
