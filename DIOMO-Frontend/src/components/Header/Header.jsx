import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { BsFacebook, BsInstagram } from 'react-icons/bs';
import { selectUserStatus, logoutUser } from '../../store/authSlice';
import Navbar from "../Navbar/Navbar";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const userStatus = useSelector(selectUserStatus);
  const firstName = localStorage.getItem('firstname');
  const email = localStorage.getItem('email');

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        console.log('Setting refreshToken cookie:', refreshToken);
        localStorage.clear();
        removeCookie('refreshToken', { path: '/', domain: 'localhost' });
        const cookies = document.cookie;
        console.log(cookies);;
        navigate('/signin');
      }
    });
  };

  useEffect(() => {
    const isLoggedIn = Boolean(email);
    setIsLoggedIn(isLoggedIn);
  }, [email]);
  return (
    <header className='header text-white'>
      <div className='container'>
        <div className='header-cnt'>
          <div className='header-cnt-top fs-13 py-2 flex align-center justify-between'>
            <div className='header-cnt-top-l'>
              <ul className='flex top-links align-center'>
                <li>
                  <Link to="/seller">Seller Center</Link>
                </li>
                <li className='vert-line'></li>
                <li>
                  <Link to="/download">Download</Link>
                </li>
                <li className='vert-line'></li>
                <li className='flex align-center'>
                  <span className='fs-13'>Follow us on</span>
                  <ul className='social-links flex align-center'>
                    <li className='mx-2'>
                      <a href="www.facebook.com" className='fs-15'>
                        <BsFacebook />
                      </a>
                    </li>
                    <li className='mx-2'>
                      <a href="www.instagram.com" className='fs-15'>
                        <BsInstagram />
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className='header-cnt-top-r'>
              {isLoggedIn ? (
                <>
                  <span className='top-link-itm-txt fs-4'>{firstName}</span>
                  <button onClick={handleLogout} className='fs-4 text-white mx-3'>Signout</button>
                </>
              ) : (
                <ul className='top-links flex align-center'>
                  <li>
                    <Link to="/signup">
                      <span className='top-link-itm-txt'>Register</span>
                    </Link>
                  </li>
                  <li className='vert-line'></li>
                  <li>
                    <Link to="/signin">
                      <span className='top-link-itm-txt'>Log in</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className='header-cnt-bottom'>
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;