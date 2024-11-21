import React from 'react';
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:id' element={<ProductPage />} />
        <Route path='/user/:userId' element={<ProfilePage />} />
      </Routes>
    </>
  )
}

export default App
