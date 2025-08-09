import React, { useEffect, useState, useRef } from "react";
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import 'rc-menu/assets/index.css';
import { NavLink, useNavigate } from "react-router-dom";
import Popup from "./Popup";
import SideCart from "./SideCart";

function Header() {
    const [state, setState] = useState({
        location: "Coimbatore",
        item: "Vegetables",
        popup: null,
    });
    const refs = {
        header: useRef(null),
        mobHeader: useRef(null),
        menu: useRef(null),
        cart: useRef(null),
        button: useRef(null),
    };

    useEffect(() => {
        const isSticky = () => {
            const scrollTop = window.scrollY;
            if (scrollTop >= 126) {
                refs.header.current.classList.add('is-sticky');
            } else {
                refs.header.current.classList.remove('is-sticky');
            }
            if (scrollTop >= 1) {
                refs.mobHeader.current.classList.add('sticky-bdr');
            } else {
                refs.mobHeader.current.classList.remove('sticky-bdr');
            }
        };

        window.addEventListener('scroll', isSticky);
        return () => window.removeEventListener('scroll', isSticky);
    }, []);

    const PopUp = (type) => {
        refs[type].current.classList.toggle('bb-menu-open');
        setState((prev) => ({...prev, popup: prev.popup === type ? null : type, }));
    };
    useEffect(() => {
        const menu = refs.menu.current;

        const handleToggle = (e) => {
            const toggle = e.target.closest('.menu-toggle');
            if (!toggle || !menu.contains(toggle)) return;

            e.preventDefault();
            const li = toggle.closest('li');
            const subMenu = li.querySelector(':scope > .sub-menu');

            if (subMenu) {
                subMenu.classList.toggle('show');
                toggle.classList.toggle('active');
            }
        };

        menu.addEventListener('click', handleToggle);

        return () => {
            menu.removeEventListener('click', handleToggle);
        };
    }, []);

    const handleSelect = (field) => ({ key }) => {
        setState(prev => ({ ...prev, [field]: key }));
    };

    return (
<>
        <header className="bb-header">
            <div className="top-header">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="inner-top-header">
                                <div className="col-left-bar"><a href="#">Flat 50% Off On
                                    Grocery Shop.</a></div>
                                <div className="col-right-bar">
                                    <div className="cols"><a href="#">Help?</a></div>
                                    <div className="cols"><a href="#">Track Order</a></div>
                                    <div className="cols">
                                        <div className="custom-dropdown"><a className="bb-dropdown-toggle" href="#">Language</a>
                                            <ul className="dropdown">
                                                <li><a href="#">English</a></li>
                                                <li><a href="#">Hindi</a></li>
                                                <li><a href="#">Gujarati</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="cols">
                                        <div className="custom-dropdown"><a className="bb-dropdown-toggle" href="#">Currency</a>
                                            <ul className="dropdown">
                                                <li><a href="#">USD $</a></li>
                                                <li><a href="#">EUR €</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-header">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="inner-bottom-header">
                                <div className="cols bb-logo-detail">
                                    <div className="header-logo"><NavLink to="/"><img src="/src/img/logo-1.png" className="light" /></NavLink></div><a
                                        className="bb-sidebar-toggle bb-category-toggle" href="#"><svg className="svg-icon"
                                            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M384 928H192a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 608a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V640a32 32 0 0 0-32-32H192zM784 928H640a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v144a32 32 0 0 1-64 0V640a32 32 0 0 0-32-32H640a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h144a32 32 0 0 1 0 64zM384 480H192a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H192zM832 480H640a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM640 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H640z">
                                            </path>
                                        </svg></a>
                                </div>
                                <div className="rev-row">
                                    <div className="cols">
                                        <div className="header-search">
                                            <form className="bb-btn-group-form" action="#">
                                                <Dropdown
                                                    overlay={<Menu onClick={handleSelect("item")} className="select-options bb-dropdown-location">
                                                        <MenuItem key="Vegetables">Vegetables</MenuItem>
                                                        <MenuItem key="Bakery">Bakery</MenuItem>
                                                        <MenuItem key="Cold Drinks">Cold Drinks</MenuItem>
                                                        <MenuItem key="Fruits">Fruits</MenuItem>
                                                    </Menu>}
                                                    trigger={['click']}
                                                    animation="slide-up"
                                                >
                                                    <div className="inner-select location-dark">
                                                        <div className="custom-select">{state.item}<i style={{ fontSize: "30px" }}
                                                            className="ri-arrow-drop-down-line"></i></div>
                                                    </div></Dropdown>
                                                <input className="form-control bb-search-bar" placeholder="Search products..."
                                                    type="text" /><button className="submit" type="submit"><i
                                                        className="ri-search-line"></i></button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="cols bb-icons mob-stickey" ref={refs.mobHeader}>
                                        <div className="header-logo"><NavLink to="/"><img src="/src/img/logo-1.png" className="light" /></NavLink></div>
                                        <div className="bb-flex-justify">
                                            <div className="bb-header-buttons">
                                                <div className="bb-acc-drop"><div
                                                    className="bb-header-btn bb-header-user dropdown-toggle bb-user-toggle" role="button"
                                                    title="Account">
                                                    <div className="header-icon"><svg className="svg-icon" viewBox="0 0 1024 1024"
                                                        version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M512.476 648.247c-170.169 0-308.118-136.411-308.118-304.681 0-168.271 137.949-304.681 308.118-304.681 170.169 0 308.119 136.411 308.119 304.681C820.594 511.837 682.645 648.247 512.476 648.247L512.476 648.247zM512.476 100.186c-135.713 0-246.12 109.178-246.12 243.381 0 134.202 110.407 243.381 246.12 243.381 135.719 0 246.126-109.179 246.126-243.381C758.602 209.364 648.195 100.186 512.476 100.186L512.476 100.186zM935.867 985.115l-26.164 0c-9.648 0-17.779-6.941-19.384-16.35-2.646-15.426-6.277-30.52-11.142-44.95-24.769-87.686-81.337-164.13-159.104-214.266-63.232 35.203-134.235 53.64-207.597 53.64-73.555 0-144.73-18.537-208.084-53.922-78 50.131-134.75 126.68-159.564 214.549 0 0-4.893 18.172-11.795 46.4-2.136 8.723-10.035 14.9-19.112 14.9L88.133 985.116c-9.415 0-16.693-8.214-15.47-17.452C91.698 824.084 181.099 702.474 305.51 637.615c58.682 40.472 129.996 64.267 206.966 64.267 76.799 0 147.968-23.684 206.584-63.991 124.123 64.932 213.281 186.403 232.277 329.772C952.56 976.901 945.287 985.115 935.867 985.115L935.867 985.115z">
                                                        </path>
                                                    </svg></div>
                                                    <div className="bb-btn-desc"><span className="bb-btn-title">Account</span><span
                                                        className="bb-btn-stitle">Login</span></div>
                                                </div>
                                                    <ul className="bb-dropdown-menu">
                                                        <li><NavLink to="/register" className="dropdown-item">Register</NavLink>
                                                        </li>
                                                        <li><NavLink to="/checkout" className="dropdown-item" >Checkout</NavLink>
                                                        </li>
                                                        <li><NavLink to="/login" className="dropdown-item" >Login</NavLink></li>
                                                    </ul>
                                                </div><NavLink className="bb-header-btn bb-wish-toggle" title="Wishlist"
                                                    to="/wishlist">
                                                    <div className="header-icon"><svg className="svg-icon" viewBox="0 0 1024 1024"
                                                        version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M512 128l121.571556 250.823111 276.366222 39.111111-199.281778 200.504889L756.622222 896 512 769.536 267.377778 896l45.852444-277.617778-199.111111-200.504889 276.366222-39.111111L512 128m0-56.888889a65.962667 65.962667 0 0 0-59.477333 36.807111l-102.940445 213.703111-236.828444 35.214223a65.422222 65.422222 0 0 0-52.366222 42.979555 62.577778 62.577778 0 0 0 15.274666 64.967111l173.511111 173.340445-40.248889 240.355555a63.374222 63.374222 0 0 0 26.993778 62.577778 67.242667 67.242667 0 0 0 69.632 3.726222L512 837.290667l206.478222 107.605333a67.356444 67.356444 0 0 0 69.688889-3.726222 63.374222 63.374222 0 0 0 26.908445-62.577778l-40.277334-240.355556 173.511111-173.340444a62.577778 62.577778 0 0 0 15.246223-64.967111 65.422222 65.422222 0 0 0-52.366223-42.979556l-236.8-35.214222-102.968889-213.703111A65.848889 65.848889 0 0 0 512 71.111111z"
                                                            fill="#364C58"></path>
                                                    </svg></div>
                                                    <div className="bb-btn-desc"><span className="bb-btn-title"><b
                                                        className="bb-wishlist-count">3</b>items</span><span
                                                            className="bb-btn-stitle">Wishlist</span></div>
                                                </NavLink><div role="button" onClick={() => PopUp("cart")} className="bb-header-btn bb-cart-toggle" title="Cart">
                                                    <div className="header-icon"><svg className="svg-icon" viewBox="0 0 1024 1024"
                                                        version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M351.552 831.424c-35.328 0-63.968 28.64-63.968 63.968 0 35.328 28.64 63.968 63.968 63.968 35.328 0 63.968-28.64 63.968-63.968C415.52 860.064 386.88 831.424 351.552 831.424L351.552 831.424 351.552 831.424zM799.296 831.424c-35.328 0-63.968 28.64-63.968 63.968 0 35.328 28.64 63.968 63.968 63.968 35.328 0 63.968-28.64 63.968-63.968C863.264 860.064 834.624 831.424 799.296 831.424L799.296 831.424 799.296 831.424zM862.752 799.456 343.264 799.456c-46.08 0-86.592-36.448-92.224-83.008L196.8 334.592 165.92 156.128c-1.92-15.584-16.128-28.288-29.984-28.288L95.2 127.84c-17.664 0-32-14.336-32-31.968 0-17.664 14.336-32 32-32l40.736 0c46.656 0 87.616 36.448 93.28 83.008l30.784 177.792 54.464 383.488c1.792 14.848 15.232 27.36 28.768 27.36l519.488 0c17.696 0 32 14.304 32 31.968S880.416 799.456 862.752 799.456L862.752 799.456zM383.232 671.52c-16.608 0-30.624-12.8-31.872-29.632-1.312-17.632 11.936-32.928 29.504-34.208l433.856-31.968c15.936-0.096 29.344-12.608 31.104-26.816l50.368-288.224c1.28-10.752-1.696-22.528-8.128-29.792-4.128-4.672-9.312-7.04-15.36-7.04L319.04 223.84c-17.664 0-32-14.336-32-31.968 0-17.664 14.336-31.968 32-31.968l553.728 0c24.448 0 46.88 10.144 63.232 28.608 18.688 21.088 27.264 50.784 23.52 81.568l-50.4 288.256c-5.44 44.832-45.92 81.28-92 81.28L385.6 671.424C384.8 671.488 384 671.52 383.232 671.52L383.232 671.52zM383.232 671.52">
                                                        </path>
                                                    </svg><span className="main-label-note-new"></span></div>
                                                    <div className="bb-btn-desc"><span className="bb-btn-title"><b
                                                        className="bb-cart-count">4</b> items</span><span
                                                            className="bb-btn-stitle">Cart</span></div>
                                                </div><a href="javascript:void(0);" onClick={() => PopUp("menu")} className="bb-toggle-menu" >
                                                    <div className="header-icon"><i className="ri-menu-3-fill"></i></div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div style={{display: "block"}} class="bb-mobile-menu-overlay"></div> */}
                <div ref={refs.menu} className="bb-mobile-menu ">
                    <div className="bb-menu-title"><span className="menu_title">My Menu</span><button type="button" onClick={() => PopUp("menu")}
                        className="bb-close-menu">×</button></div>
                    <div className="bb-menu-inner">
                        <div className="bb-menu-content">
                            <ul>
                                <li><NavLink to="/">Home</NavLink></li>
                                <li><span className="menu-toggle"  ></span><a href="#">Categories</a>
                                    <ul style={{ display: "none" }} className="sub-menu height-transition-1s-ease collapse">
                                        <li><span className="menu-toggle"></span><a href="#">Classic</a>
                                            <ul style={{ display: "none" }} className="sub-menu height-transition-1s-ease collapse">
                                                <li><a href="#">Left sidebar 3 column</a></li>
                                                <li><a href="#">Left sidebar 4 column</a></li>
                                                <li><a href="#">Right sidebar 3 column</a>
                                                </li>
                                                <li><a href="#">Right sidebar 4 column</a>
                                                </li>
                                                <li><a href="#">Full width 4 column</a></li>
                                            </ul>
                                        </li>
                                        <li><span className="menu-toggle"></span><a href="#">Banner</a>
                                            <ul style={{ display: "none" }} className="sub-menu height-transition-1s-ease collapse">
                                                <li><a href="#">Left sidebar 3
                                                    column</a></li>
                                                <li><a href="#">Left sidebar 4
                                                    column</a></li>
                                                <li><a href="#">Right sidebar 3
                                                    column</a></li>
                                                <li><a href="#">Right sidebar 4
                                                    column</a></li>
                                                <li><a href="#">Full width 4 column</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><span className="menu-toggle"></span><a href="#">Columns</a>
                                            <ul style={{ display: "none" }} className="sub-menu height-transition-1s-ease collapse">
                                                <li><a href="#">3 column Full width</a></li>
                                                <li><a href="#">4 column Full width</a></li>
                                                <li><a href="#">5 column Full width</a></li>
                                                <li><a href="#">6 column Full width</a></li>
                                                <li><a href="#">Banner 3 column</a></li>
                                            </ul>
                                        </li>
                                        <li><span className="menu-toggle"></span><a href="#">List</a>
                                            <ul style={{ display: "none" }} className="sub-menu height-transition-1s-ease collapse">
                                                <li><a href="#">shop Left sidebar</a></li>
                                                <li><a href="#">shop right sidebar </a></li>
                                                <li><a href="#">Banner left sidebar</a></li>
                                                <li><a href="#">Banner Right sidebar </a>
                                                </li>
                                                <li><a href="#">Full width 2 column</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li><span className="menu-toggle"></span><a href="#">Products</a>
                                    <ul style={{ display: "none" }} className="sub-menu height-transition-1s-ease collapse">
                                        <li><span className="menu-toggle"></span><a href="#">Product page</a>
                                            <ul style={{ display: "none" }} className="sub-menu height-transition-1s-ease collapse">
                                                <li><a href="#">Product left sidebar</a></li>
                                                <li><a href="#">Product right sidebar</a></li>
                                            </ul>
                                        </li>
                                        <li><span className="menu-toggle"></span><a href="#">Product Accordion</a>
                                            <ul style={{ display: "none" }} className="sub-menu height-transition-1s-ease collapse">
                                                <li><a href="#">left sidebar</a></li>
                                                <li><a href="#">right sidebar</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#">Product full width</a></li>
                                        <li><a href="#">accordion full width</a></li>
                                    </ul>
                                </li>
                                <li><span className="menu-toggle"></span><a href="#">Pages</a>
                                    <ul style={{ display: "none" }} className="sub-menu height-transition-1s-ease collapse">
                                        <li><NavLink to="/about">About Us</NavLink></li>
                                        <li><NavLink to="/contact">Contact Us</NavLink></li>
                                        <li><NavLink to="/cart">Cart</NavLink></li>
                                        <li><NavLink to="/checkout">Checkout</NavLink></li>
                                        <li><NavLink to="/login">Login</NavLink></li>
                                        <li><NavLink to="/register">Register</NavLink></li>
                                    </ul>
                                </li>
                                <li><span className="menu-toggle"></span><a href="#">Blog</a>
                                    <ul style={{ display: "none" }} className="sub-menu height-transition-1s-ease collapse">
                                        <li><NavLink to="/">Left sidebar</NavLink></li>
                                        <li><NavLink to="/">Right sidebar</NavLink></li>
                                        <li><NavLink to="/">Full width</NavLink></li>
                                        <li><NavLink to="/">Detail Left sidebar</NavLink></li>
                                        <li><NavLink to="/">Detail Right Sidebar</NavLink></li>
                                        <li><NavLink to="/">Detail Full width</NavLink></li>
                                    </ul>
                                </li>
                                <li><a href="#">Offers</a></li>
                            </ul>
                        </div>
                        <div className="header-res-lan-curr">
                            <div className="header-res-social">
                                <div className="header-top-social">
                                    <ul className="mb-0">
                                        <li className="list-inline-item"><a href="#"><i className="ri-facebook-fill"></i></a></li>
                                        <li className="list-inline-item"><a href="#"><i className="ri-twitter-fill"></i></a></li>
                                        <li className="list-inline-item"><a href="#"><i className="ri-instagram-line"></i></a></li>
                                        <li className="list-inline-item"><a href="#"><i className="ri-linkedin-fill"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="header-height">
                <div className="bb-main-menu-desk" ref={refs.header}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="bb-inner-menu-desk"><a className="bb-header-btn bb-sidebar-toggle bb-category-toggle"
                                    href="#"><svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M384 928H192a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 608a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V640a32 32 0 0 0-32-32H192zM784 928H640a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v144a32 32 0 0 1-64 0V640a32 32 0 0 0-32-32H640a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h144a32 32 0 0 1 0 64zM384 480H192a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H192zM832 480H640a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM640 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H640z">
                                        </path>
                                    </svg></a><button className="navbar-toggler shadow-none" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                                        aria-controls="navbarSupportedContent" aria-expanded="false"
                                        aria-label="Toggle navigation"><i className="ri-menu-2-line"></i></button>
                                    <div className="bb-main-menu" id="navbarSupportedContent">
                                        <ul className="navbar-nav">
                                            <li className="nav-item"><NavLink to="/" className="nav-link">Home</NavLink></li>
                                            <li className="nav-item bb-main-dropdown"><a className="nav-link bb-dropdown-item"
                                                href="#">Categories</a>
                                                <ul className="mega-menu">
                                                    <li>
                                                        <ul className="mega-block">
                                                            <li className="menu_title"><a href="#">Classic</a></li>
                                                            <li><a href="#">Left sidebar 3
                                                                column</a></li>
                                                            <li><a href="#">Left sidebar 4
                                                                column</a></li>
                                                            <li><a href="#">Right sidebar 3
                                                                column</a></li>
                                                            <li><a href="#">Right sidebar 4
                                                                column</a></li>
                                                            <li><a href="#">Full width 4
                                                                column</a></li>
                                                        </ul>
                                                        <ul className="mega-block">
                                                            <li className="menu_title"><a href="#">Banner</a></li>
                                                            <li><a href="#">Left sidebar
                                                                3 column</a></li>
                                                            <li><a href="#">Left sidebar
                                                                4 column</a></li>
                                                            <li><a href="#">Right
                                                                sidebar 3 column</a></li>
                                                            <li><a href="#">Right
                                                                sidebar 4 column</a></li>
                                                            <li><a href="#">Full width 4
                                                                column</a></li>
                                                        </ul>
                                                        <ul className="mega-block">
                                                            <li className="menu_title"><a href="#">Columns</a></li>
                                                            <li><a href="#">3 column Full
                                                                width</a></li>
                                                            <li><a href="#">4 column Full
                                                                width</a></li>
                                                            <li><a href="#">5 column Full
                                                                width</a></li>
                                                            <li><a href="#">6 column Full
                                                                width</a></li>
                                                            <li><a href="#">Banner 3
                                                                column</a></li>
                                                        </ul>
                                                        <ul className="mega-block">
                                                            <li className="menu_title"><a href="#">List</a></li>
                                                            <li><a href="#">shop Left
                                                                sidebar</a></li>
                                                            <li><a href="#">shop right sidebar
                                                            </a></li>
                                                            <li><a href="#">Banner left
                                                                sidebar</a></li>
                                                            <li><a href="#">Banner Right
                                                                sidebar </a></li>
                                                            <li><a href="#">Full width 2
                                                                column</a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item bb-dropdown"><a className="nav-link bb-dropdown-item"
                                                href="#">Products</a>
                                                <ul className="bb-dropdown-menu">
                                                    <li className="bb-mega-dropdown"><a className="bb-mega-item" href="#">Product
                                                        Page</a>
                                                        <ul className="bb-mega-menu">
                                                            <li><a href="#">Product Left
                                                                Sidebar</a></li>
                                                            <li><a href="#">Product Right
                                                                Sidebar</a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="bb-mega-dropdown"><a className="bb-mega-item" href="#">Product
                                                        According</a>
                                                        <ul className="bb-mega-menu">
                                                            <li><a href="#">Left
                                                                Sidebar</a></li>
                                                            <li><a href="#">Right
                                                                Sidebar</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="#">Product full width</a></li>
                                                    <li><a href="#">accordion full
                                                        width</a></li>
                                                </ul>
                                            </li>
                                            <li className="nav-item bb-dropdown"><a className="nav-link bb-dropdown-item"
                                                href="#">Pages</a>
                                                <ul className="bb-dropdown-menu">
                                                    <li><NavLink to="/about">About Us</NavLink></li>
                                                    <li><NavLink to="/contact">Contact Us</NavLink></li>
                                                    <li><NavLink to="/cart">Cart</NavLink></li>
                                                    <li><NavLink to="/checkout">Checkout</NavLink></li>
                                                    <li><NavLink to="/login">Login</NavLink></li>
                                                    <li><NavLink to="/register">Register</NavLink></li>
                                                </ul>
                                            </li>
                                            <li className="nav-item bb-dropdown"><a className="nav-link bb-dropdown-item"
                                                href="#">Blog</a>
                                                <ul className="bb-dropdown-menu">
                                                    <li><a href="#">Left sidebar</a></li>
                                                    <li><a href="#">Right sidebar</a></li>
                                                    <li><a href="#">Full width</a></li>
                                                    <li><a href="#">Detail Left sidebar</a>
                                                    </li>
                                                    <li><a href="#">Detail Right Sidebar</a>
                                                    </li>
                                                    <li><a href="#">Detail Full width</a></li>
                                                </ul>
                                            </li>
                                            <li className="nav-item"><a className="nav-link" href="#"><svg
                                                enableBackground="new 0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                                                version="1.1" x="0" y="0" viewBox="0 0 64 64">
                                                <g>
                                                    <path
                                                        d="M10 16v22c0 .3.1.6.2.8.3.6 6.5 13.8 21 20h.2c.2 0 .3.1.5.1s.3 0 .5-.1h.2c14.5-6.2 20.8-19.4 21-20 .1-.3.2-.5.2-.8V16c0-.9-.6-1.7-1.5-1.9-7.6-1.9-19.3-9.6-19.4-9.7-.1-.1-.2-.1-.4-.2-.1 0-.1 0-.2-.1h-.9c-.1 0-.2.1-.3.1-.1.1-.2.1-.4.2s-11.8 7.8-19.4 9.7c-.7.2-1.3 1-1.3 1.9zm4 1.5c6.7-2.1 15-7.2 18-9.1 3 1.9 11.3 7 18 9.1v20c-1.1 2.1-6.7 12.1-18 17.3-11.3-5.2-16.9-15.2-18-17.3z"
                                                        fill="#000000" opacity="1" data-original="#000000"></path>
                                                    <path
                                                        d="M28.6 38.4c.4.4.9.6 1.4.6s1-.2 1.4-.6l9.9-9.9c.8-.8.8-2 0-2.8s-2-.8-2.8 0L30 34.2l-4.5-4.5c-.8-.8-2-.8-2.8 0s-.8 2 0 2.8z"
                                                        fill="#000000" opacity="1" data-original="#000000"></path>
                                                </g>
                                            </svg> Offers</a></li>
                                        </ul>
                                    </div>
                                    <div className="bb-dropdown-menu">

                                        <Dropdown
                                            overlay={<Menu onClick={handleSelect("location")} className="select-options bb-dropdown-location">
                                                <MenuItem key="Coimbatore">Coimbatore</MenuItem>
                                                <MenuItem key="Chennai">Chennai</MenuItem>
                                                <MenuItem key="Surat">Surat</MenuItem>
                                                <MenuItem key="Mumbai">Delhi</MenuItem>
                                                <MenuItem key="Udaipur">Udaipur</MenuItem>
                                            </Menu>}
                                            trigger={['click']}
                                            animation="slide-up"
                                        >
                                            <div className="inner-select"><svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M511.614214 958.708971c-21.76163 0-41.744753-9.781784-54.865586-26.862811L222.50156 626.526383c-3.540639-4.044106-5.872754-7.978718-7.349385-10.461259-41.72838-58.515718-63.959707-127.685078-63.959707-199.699228 0.87288-193.650465 162.903184-351.075891 361.209691-351.075891 198.726064 0 360.40435 157.49194 360.40435 351.075891-0.839111 72.190159-23.070438 140.856052-64.345494 199.053522-1.962701 3.288906-4.312212 7.189749-7.735171 11.098779L566.479799 931.847184c-13.120832 17.080004-33.103956 26.861788-54.865585 26.861787zM273.525654 580.51956a33.707706 33.707706 0 0 1 2.63399 3.037173L511.278569 890.00931 747.068783 583.556733c0.435928-0.569982 0.889253-1.124614 1.358951-1.669013l2.51631-4.102434c0.285502-0.453325 0.587378-0.89744 0.889253-1.325182 33.507138-46.921659 51.577702-102.416578 52.248991-160.487158 0-155.294902-130.839931-281.95565-291.679105-281.95565-160.571069 0-291.780413 126.72931-292.484448 282.501073 0 57.450457 17.802458 112.811322 51.460022 159.933549l2.90312 4.580318c0.418532 0.73678-0.186242 0.032746-0.756223-0.512676z m476.059439 0.100284v0z m0.066515-0.058329c-0.016373 0.016373-0.033769 0.025583-0.033769 0.041956 0.001023-0.016373 0.017396-0.025583 0.033769-0.041956z m0.051166-0.041955a0.227174 0.227174 0 0 0-0.050142 0.041955c0.016373-0.016373 0.032746-0.033769 0.050142-0.041955z"
                                                    fill="#444444"></path>
                                                <path
                                                    d="M512 577.206094c-90.000803 0-163.222455-73.221652-163.222455-163.222455s73.221652-163.222455 163.222455-163.222455S675.222455 323.982836 675.222455 413.983639s-73.222675 163.222455-163.222455 163.222455z m0-240.538355c-42.634006 0-77.3159 34.68087-77.3159 77.3159s34.68087 77.3159 77.3159 77.3159 77.3159-34.681894 77.3159-77.3159-34.681894-77.3159-77.3159-77.3159z"
                                                    fill="#00D8A0"></path>
                                            </svg>
                                                <div>
                                                    <div className="location position-relative" style={{ cursor: 'pointer' }}>
                                                        <div className="custom-select location-select">{state.location}</div>
                                                        <div
                                                            className="custom-select-arrow"
                                                            style={{ position: 'absolute', left: '105px', top: '0px' }}
                                                        >
                                                            <i
                                                                style={{ fontSize: '30px' }}
                                                                className="ri-arrow-drop-down-line"
                                                            ></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>

            
                <SideCart setref={refs.cart} PopUp={PopUp} />
                <Popup overlay={state.popup} PopUp={PopUp} />
        </header>
        
        </>
        
    )
}

export default Header