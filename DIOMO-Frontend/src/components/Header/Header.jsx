import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsFacebook, BsInstagram } from 'react-icons/bs';
// import { selectUserStatus, logoutUser, selectUser } from '../../store/authSlice';
// import { STATUS } from '../../utils/status';
import Navbar from "../Navbar/Navbar";
import "./Header.scss";

const Header = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const userStatus = useSelector(selectUserStatus);
  // const user = useSelector(selectUser);
  // const firstName = user?.firstname;

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  //   navigate('/');
  // };

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
              {/* {userStatus === STATUS.SUCCEEDED ? (
                <>
                  <span className='top-link-itm-txt'>{firstName}</span>
                  <button onClick={handleLogout} className='fs-6 text-white mx-3'>Signout</button>
                </>
              ) : ( */}
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
              {/* )} */}
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