import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {AiOutlineClose} from 'react-icons/ai'
import { getSidebarStatus, setSidebarOff } from '../../store/sidebarSlice';
import { fetchAsyncCategories, getAllCategories } from '../../store/categorySlice';
import "./Sidebar.scss";

const Sidebar = () => {

  const dispatch = useDispatch();
  const isSidebarOn = useSelector(getSidebarStatus);
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchAsyncCategories())
  }, [dispatch])

  return (
    <aside className={`sidebar ${isSidebarOn ? 'hide-sidebar' : ""}`}>
      <button type = "button" className='sidebar-hide-btn' onClick={() => dispatch(setSidebarOff())}>
        <AiOutlineClose />
      </button>
      <div className='sidebar-cnt'>
        <div className='cat-title fs-17 text-uppercase fw-6 ls-1h'>All Categories</div>
        <ul className='cat-list'>
          {
            categories.map((category, idx) => {
              return (
                <li key = {idx} onClick = {() => dispatch(setSidebarOff())}>
                  <Link to = {`category/${category}`} className='cat-list-link text-capitalize'>{category.replace("-", " ")}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;