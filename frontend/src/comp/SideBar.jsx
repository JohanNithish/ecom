import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faRightFromBracket,
  faBars,
  faCircleChevronLeft,
  faThList,
  faGifts,
  faBagShopping,
  faShoppingBasket,
  faUsers,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons';
export const SideBar = ({ isOpen, ToggleSidebar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
   <>
    <aside className="vertical-sidebar"> 
    <nav className="nav">
        <div className="sidebar-header">
            <div className="sidebar__toggle-container"> <label tabIndex="0" htmlFor="checkbox-input" id="label-for-checkbox-input" className="nav__toggle"> <span className="toggle--icons" onClick={ToggleSidebar}> <FontAwesomeIcon icon={ isOpen ? faBars : faCircleChevronLeft} />  </span> </label> </div>
            <div className="text-center">
            <img className="codepen-logo" src="/img/logo.png" alt="" />
            </div>
        </div>
    
          <Sidebar className="sidebar__wrapper">
      <Menu className="sidebar__list list--secondary">
<li className="sidebar__item item--heading">
                    <h2 className="sidebar__item--heading">General</h2>
                </li>
        <MenuItem className="sidebar__item" component={<NavLink to="/admin/home" />}>
          <div className="sidebar__link">
            <span className="icon"><FontAwesomeIcon icon={faHome} /></span>
            <span className="text">Home</span>
          </div>
        </MenuItem>
        <li className="sidebar__item item--heading">
                    <h2 className="sidebar__item--heading">Master</h2>
                </li>

        <MenuItem className="sidebar__item" component={<NavLink to="/admin/category" />}>
          <div className="sidebar__link">
            <span className="icon"><FontAwesomeIcon icon={faThList} /></span>
            <span className="text">Manage Categiory</span>
          </div>
        </MenuItem>

        <MenuItem className="sidebar__item" component={<NavLink to="/admin/deals" />}>
          <div className="sidebar__link">
            <span className="icon"><FontAwesomeIcon icon={faGifts} /></span>
            <span className="text">Manage Deals</span>
          </div>
        </MenuItem>

       <li className="sidebar__item item--heading">
                    <h2 className="sidebar__item--heading">Product</h2>
                </li>

        <MenuItem className="sidebar__item" component={<NavLink to="/admin/addproduct" />}>
          <div className="sidebar__link">
            <span className="icon"><FontAwesomeIcon icon={faBagShopping} /></span>
            <span className="text">Add Product</span>
          </div>
        </MenuItem>

        <MenuItem className="sidebar__item" component={<NavLink to="/admin/listproduct" />}>
          <div className="sidebar__link">
            <span className="icon"><FontAwesomeIcon icon={faShoppingBasket} /></span>
            <span className="text">List Products</span>
          </div>
        </MenuItem>

         <li className="sidebar__item item--heading">
                    <h2 className="sidebar__item--heading">Users</h2>
                </li>

        <MenuItem className="sidebar__item" component={<NavLink to="/admin/listuser" />}>
          <div className="sidebar__link">
            <span className="icon"><FontAwesomeIcon icon={faUsers} /></span>
            <span className="text">List Users</span>
          </div>
        </MenuItem>

        <MenuItem className="sidebar__item" component={<NavLink to="/admin/listorder" />}>
          <div className="sidebar__link">
            <span className="icon"><FontAwesomeIcon icon={faShoppingCart} /></span>
            <span className="text">List Orders</span>
          </div>
        </MenuItem>

       
 <li className="sidebar__item item--heading">
                    <h2 className="sidebar__item--heading">Others</h2>
                </li>
        <MenuItem className="sidebar__item" onClick={handleLogout}>
          <div className="sidebar__link">
            <span className="icon"><FontAwesomeIcon icon={faRightFromBracket} /></span>
            <span className="text">Logout</span>
          </div>
        </MenuItem>

      </Menu>
    </Sidebar>

    </nav>
</aside>
   </>
  )
}
