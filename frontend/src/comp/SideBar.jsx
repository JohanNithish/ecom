import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faHome,
  faGear,
  faList,
  faRightFromBracket,
  faUserCircle,
  faBars,
  faCircleChevronLeft
} from '@fortawesome/free-solid-svg-icons';
export const SideBar = ({ isOpen, ToggleSidebar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };
  return (
   <>
    <aside className="vertical-sidebar"> 
    <nav>
        <header>
            <div className="sidebar__toggle-container"> <label tabIndex="0" htmlFor="checkbox-input" id="label-for-checkbox-input" className="nav__toggle"> <span className="toggle--icons" onClick={ToggleSidebar}> <FontAwesomeIcon icon={ isOpen ? faBars : faCircleChevronLeft} />  </span> </label> </div>
            <div className="text-center">
            <img className="codepen-logo" src="/img/logo.png" alt="" />
            </div>
        </header>
        <section className="sidebar__wrapper">
            <ul className="sidebar__list list--secondary">
                <li className="sidebar__item"> <NavLink to="/admin/home"><div className="sidebar__link"> <span className="icon"><FontAwesomeIcon icon={faHome} /> </span> <span className="text">Home</span> </div></NavLink> </li>
                <li className="sidebar__item"> <NavLink to="/admin/adduser"><div className="sidebar__link"> <span className="icon"> <FontAwesomeIcon icon={faUser} /> </span> <span className="text">Add User</span> </div></NavLink> </li>
                <li className="sidebar__item"> <NavLink to="/admin/listuser"><div className="sidebar__link"> <span className="icon"> <FontAwesomeIcon icon={faList} /> </span> <span className="text">List User</span> </div></NavLink> </li>
            
                <li className="sidebar__item"> <div className="sidebar__link"> <span className="icon"> <FontAwesomeIcon icon={faUserCircle} /></span> <span className="text">Profile</span> </div> </li>
                <li className="sidebar__item"> <div className="sidebar__link"> <span className="icon"> <FontAwesomeIcon icon={faGear} /></span> <span className="text">Settings</span> </div> </li>
                <li className="sidebar__item" onClick={handleLogout}> <div className="sidebar__link"> <span className="icon"> <FontAwesomeIcon icon={faRightFromBracket} /> </span> <span className="text">Logout</span> </div> </li>
            </ul>
        </section>
    </nav>
</aside>
   </>
  )
}
