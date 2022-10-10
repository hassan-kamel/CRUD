import React from 'react';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <>
      <div className='container mx-auto flex gap-5 items-center justify-center md:block'>
        <Link
          to='/products'
          className='flex justify-start items-center rounded-lg  p-2 cursor-pointer bg-gray-100 md:mb-5 hover:scale-105 transition-all '>
          <div className='icon mr-1'>
            <svg
              width='32px'
              height='32px'
              viewBox='0 0 1024 1024'
              className='fill-red-400'>
              <path d='M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32zm-432-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16H400v-16zm392 544H232V384h96v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h224v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h96v456z' />
            </svg>
          </div>
          <div className='typo text-md capitalize font-medium text-gray-800'>
            products
          </div>
        </Link>
        <Link
          to='/products/actions/0/1'
          className='flex justify-start items-center rounded-lg  p-2 cursor-pointer bg-gray-100  hover:scale-105 transition-all'>
          <div className='icon mr-1'>
            <svg
              width='32px'
              height='32px'
              viewBox='0 0 20 20'
              className='fill-red-400'>
              <g id='layer1'>
                <path d='M 9 1 L 9 10 L 0 10 L 0 11 L 9 11 L 9 20 L 10 20 L 10 11 L 19 11 L 19 10 L 10 10 L 10 1 L 9 1 z ' />
              </g>
            </svg>
          </div>
          <div className='typo text-md capitalize font-medium text-gray-800'>
            add product
          </div>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
