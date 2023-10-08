import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { Home, Cart, CategoryProduct, ProductSingle, Search } from './pages/index';
import Signin from './pages/AuthPage/Signin';
import Signup from './pages/AuthPage/Signup';
import ForgotPassword from './pages/AuthPage/ForgotPassword';
import ResetPassword from './pages/AuthPage/ResetPassword';
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/product/:id' element={<ProductSingle />} />
          <Route path='/category/:category' element={<CategoryProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/search/:searchTerm' element={<Search />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;