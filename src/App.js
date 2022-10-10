import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductOperations from './pages/ProductOperations';

import Home from './pages/Home';
import Product from './pages/Product';
import Products from './pages/Products';

const App = () => {
  return (
    <>
      <Navbar />
      <div className='md:flex  justify-start container mx-auto max-w-6xl p-3 mt-5'>
        <div className='side md:w-1/5 md:h-[60vh] mr-5 mb-5'>
          <Sidebar />
        </div>
        <div className='pages md:w-4/5'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />}></Route>
            <Route
              path='/products/actions/:productID/:opID'
              element={<ProductOperations />}
            />
            <Route path='/products/:productID' element={<Product />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
