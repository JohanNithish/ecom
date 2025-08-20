import React from "react";
import { Link } from "react-router-dom";
import WishlistAction from "./WishlistAction";
import CartAction from "./CartAction";

const SwiperProduct = ({ product }) => {
  const ImgSrc = import.meta.env.VITE_IMG;
  return (
    <div className="bb-deal-card">
      <div className="bb-pro-box">
        <div className="bb-pro-img">
          <span className="flags">
            <span>{product.deal}</span>
          </span>
          <div className="inner-img">
            <img className="main-img" alt="product" src={ImgSrc+product.images[0]} />
            <img className="hover-img" alt="hover" src={ImgSrc+product.images[1]} />
          </div>

          <ul className="bb-pro-actions">
              <WishlistAction id={product.id} />
              <li className="bb-btn-group">
                <a
                  data-link-action="quickview"
                  title="Quick View"
                  data-bs-toggle="modal"
                  data-bs-target="#bry_quickview_modal"
                >
                  <i className="ri-eye-line"></i>
                </a>
              </li>
              <CartAction product={product} weight={product.price[0].metric} quantity={1} />  
              <li className="bb-btn-group">
                <Link to={`/productdetails/`+product.url} title="Details">
                  <i className="ri-arrow-right-circle-line"></i>
                </Link>
              </li>
            </ul>

        </div>

        <div className="bb-pro-contact">
          <div className="bb-pro-subtitle">
            <Link to={`/productdetails/`+product.url}>{product.category}</Link>
            <span className="bb-pro-rating">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-line"></i>
            </span>
          </div>
          <h4 className="bb-pro-title">
            <Link to={`/productdetails/`+product.url}>{product.productname}</Link>
          </h4>
          <div className="bb-price">
            <div className="inner-price">
              <span className="new-price">{`₹`+product.price[0].offerprice}</span>
              {product.price[0].mrp && <span className="old-price">{`₹`+product.price[0].mrp}</span>}
              {product.price[0].stock <= 0 ? (<span className="item-left">Out Of Stock</span>) : product.price[0].stock <= 25 ? (<span className="item-left">{product.price[0].stock} Left</span>) : null }
            </div>
            <span className="last-items">{product.price[0].metric}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperProduct;
