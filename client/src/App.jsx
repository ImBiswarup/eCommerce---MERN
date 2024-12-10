import React from 'react';
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import AddProducts from './pages/addProducts';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:id' element={<ProductPage />} />
        <Route path='/u/:userId' element={<ProfilePage />} />
        <Route path='/item/add' element={<AddProducts />} />
      </Routes>
    </>
  )
}

export default App
