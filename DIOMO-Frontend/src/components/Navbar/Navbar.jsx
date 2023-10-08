import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineBars, AiOutlineShoppingCart, AiFillShopping } from 'react-icons/ai';
import { setSidebarOn } from '../../store/sidebarSlice';
import { getAllCategories } from '../../store/categorySlice';
import { getAllCarts, getCartItemsCount, getCartTotal } from '../../store/cartSlice';
import CartModal from "../CartModal/CartModal";
import "./Navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const carts = useSelector(getAllCarts);
  const itemsCount = useSelector(getCartItemsCount);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    dispatch(getCartTotal());
  }, [carts])

  return (
    <nav className='navbar'>
      <div className='navbar-cnt d-flex align-items-center'>
        <div className='brand-and-toggler d-flex align-items-center'>
          <button className='sidebar-show-btn text-white' onClick={() => dispatch(setSidebarOn())}>
            <AiOutlineBars />
          </button>
          <Link to="/" className='navbar-brand'>
            <span className='navbar-brand-ico text-white'>
              <AiFillShopping />
            </span>
            <span className='navbar-brand-txt mx-2'>
              <span className='fw-7 text-white'>DIOMO.</span>
            </span>
          </Link>
        </div>

        <div className='navbar-collapse w-100'>
          <div className='navbar-search bg-white'>
            <div className='flex align-center'>
              <input type="text" className='form-control fs-14' placeholder='Search your preferred items here' onChange={(e) => handleSearchTerm(e)} />
              <Link to={`search/${searchTerm}`} className='text-white search-btn flex align-center justify-center'>
                <BsSearch />
              </Link>
            </div>
          </div>

          <ul className='navbar-nav flex align-center fs-12 fw-4 font-manrope'>
            {
              categories.slice(0, 8).map((category, idx) => (
                <li className='nav-item no-wrap' key={idx}>
                  <Link to={`category/${category}`} className='nav-link text-capitalize'>{category.replace("-", " ")}</Link>
                </li>
              ))
            }
          </ul>
        </div>

        <div className='navbar-cart flex align-center'>
          <Link to="/cart" className='cart-btn'>
            <AiOutlineShoppingCart />
            <div className='cart-items-value'>{itemsCount}</div>
            <CartModal carts={carts} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;