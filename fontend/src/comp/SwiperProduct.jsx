import React from "react";
import { NavLink } from "react-router-dom";

const SwiperProduct = ({ product }) => {
  return (
    <div className="bb-deal-card">
      <div className="bb-pro-box">
        <div className="bb-pro-img">
          <span className="flags">
            <span>{product.tag}</span>
          </span>
          <div className="inner-img">
            <img className="main-img" alt="product" src={product.img} />
            <img className="hover-img" alt="hover" src={product.hoverImg} />
          </div>
          <ul className="bb-pro-actions">
            <li className="bb-btn-group"><a title="Wishlist"><i className="ri-heart-line"></i></a></li>
            <li className="bb-btn-group"><a data-link-action="quickview" title="Quick View" data-bs-toggle="modal" data-bs-target="#bry_quickview_modal"><i className="ri-eye-line"></i></a></li>
            <li className="bb-btn-group"><a title="Compare"><i className="ri-repeat-line"></i></a></li>
            <li className="bb-btn-group"><a title="Add To Cart"><i className="ri-shopping-bag-4-line"></i></a></li>
          </ul>
        </div>

        <div className="bb-pro-contact">
          <div className="bb-pro-subtitle">
            <a href="/shop-left-sidebar-col-3/">{product.category}</a>
            <span className="bb-pro-rating">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-line"></i>
            </span>
          </div>
          <h4 className="bb-pro-title">
            <NavLink to="/product-left-sidebar">{product.title}</NavLink>
          </h4>
          <div className="bb-price">
            <div className="inner-price">
              <span className="new-price">{product.newPrice}</span>
              {product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
              {product.note && <span className="item-left">{product.note}</span>}
            </div>
            <span className="last-items">{product.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperProduct;
