import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Layout from './components/Layout/Layout';
import { Home, CategoryProduct, Cart, ProductSingle, Search } from './pages/index';
import Signin from './pages/AuthPage/Signin';
import Signup from './pages/AuthPage/Signup';
import ForgotPassword from './pages/AuthPage/ForgotPassword';
import ResetPassword from './pages/AuthPage/ResetPassword';
// import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import "./App.scss";

const App = () => {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/product/:id' element={<ProductSingle />} />
            <Route path='/category/:category' element={<CategoryProduct />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/search/:searchTerm' element={<Search />} />
            {/* <PrivateRoute path='/protectedRoute' element={<ProtectedComponent />} /> */}
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  )
};

export default App;