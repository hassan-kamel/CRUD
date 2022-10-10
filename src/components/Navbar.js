import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className='mx-auto flex max-w-6xl items-center justify-center p-4'>
      <Link
        to='/Products'
        className='inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xl'>
        🛒
      </Link>
      <ul className='flex items-center gap-2 text-xl font-medium text-gray-500'>
        <li className=''>
          <Link to='/' className='rounded-lg px-3 py-2'>
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
