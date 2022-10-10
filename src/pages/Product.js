/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${productID}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);
  return (
    <>
      {product && (
        <div className='container mx-auto w-full bg-white rounded-lg border  shadow-md '>
          <img
            className='rounded-t-lg h-80 w-full object-cover'
            src={product.images?.map((image) => {
              return image;
            })}
            alt=''
          />

          <div className='p-5'>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 '>
              {product.title}
            </h5>

            <p className='mb-3 font-normal text-gray-700 '>
              {product.description}
            </p>
            <h5 className='inline-flex items-center py-4 px-6 text-2xl font-lg text-center  text-red-500 rounded-lg '>
              {product.price} $
            </h5>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
