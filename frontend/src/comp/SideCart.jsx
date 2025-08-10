import React, { useState } from "react";
import Popup from "./Popup";
import { Link } from "react-router-dom";

const SideCart = (props) => {
  // Initial cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Black Pepper Spice pack",
      price: 32,
      unit: "1pack",
      qty: 1,
      img: "/img/new-product/5.jpg",
    },
    {
      id: 2,
      name: "Small Cardamom Spice Pack",
      price: 41,
      unit: "200g",
      qty: 1,
      img: "/img/new-product/6.jpg",
    },
    {
      id: 3,
      name: "Chilli Flakes Pack",
      price: 29,
      unit: "250g",
      qty: 1,
      img: "/img/new-product/7.jpg",
    },
    {
      id: 4,
      name: "Tomato Ketchup Pack",
      price: 9,
      unit: "500g",
      qty: 1,
      img: "/img/new-product/8.jpg",
    },
  ]);

  // Related items to upsell
  const relatedItems = [
    {
      id: 5,
      name: "Organic Apple Juice Pack",
      price: 15,
      unit: "100 ml",
      stock: 3,
      img: "/img/product/2.jpg",
    },
  ];

  // Increase quantity
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Add related item to cart
  const addToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  // Calculate totals
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const vat = subTotal * 0.2;
  const total = subTotal + vat;

  return (
    <>
    <div className="bb-side-cart" ref={props.setref} onClick={(e) => props.closePopup('cart', e)}>
      <div className="row h-full row">
        {/* Related Items */}
        <div className="col-12 d-none-767 col-md-5">
          <div className="bb-top-contact">
            <div className="bb-cart-title">
              <h4>Related Items</h4>
            </div>
          </div>

          <div className="bb-cart-box mb-minus-24 cart-related bb-border-right">
            {relatedItems.map((item) => (
              <div className="bb-deal-card mb-24" key={item.id}>
                <div className="bb-pro-box">
                  <div className="bb-pro-img">
                    <span className="flags">
                      <span>Hot</span>
                    </span>
                    <div className="inner-img">
                      <img className="main-img" alt={item.name} src={item.img} />
                      <img
                        className="hover-img"
                        alt={item.name}
                        src="/img/product/back-2.jpg"
                      />
                    </div>
                    <ul className="bb-pro-actions">
          <li className="bb-btn-group"><a title="Wishlist" href="/wishlist"><i className="ri-heart-line"></i></a></li>
          <li className="bb-btn-group"><a title="Quick View" href="#" data-bs-toggle="modal" data-bs-target="#bry_quickview_modal"><i className="ri-eye-line"></i></a></li>
          <li className="bb-btn-group"><a title="Compare" href="/compare"><i className="ri-repeat-line"></i></a></li>
                      <li className="bb-btn-group">
                        <div role="button"
                          onClick={() => addToCart(item)}
                          title="Add To Cart"
                        >
                          <i className="ri-shopping-bag-4-line"></i>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="bb-pro-contact">
                    <div className="bb-pro-subtitle">
                      <a href="/shop-left-sidebar-col-3/">Juice</a>
                      <span className="bb-pro-rating">
                        {Array(5)
                          .fill()
                          .map((_, i) => (
                            <i key={i} className="ri-star-fill"></i>
                          ))}
                      </span>
                    </div>
                    <h4 className="bb-pro-title">
                      <a href="/product-left-sidebar/">{item.name}</a>
                    </h4>
                    <div className="bb-price">
                      <div className="inner-price">
                        <span className="new-price">${item.price}</span>
                        <span className="item-left">{item.stock} Left</span>
                      </div>
                      <span className="last-items">{item.unit}</span>
                    </div>
                  </div>
                </div>
              </div>
              
            ))}
            <div className="bb-cart-banner mb-24"><div className="banner"><img alt="cart-banner" src="/img/category/cart-banner.jpg"/><div className="detail"><h4>Organic &amp; Fresh</h4><h3>Vegetables</h3><a href="/shop-left-sidebar-col-3/">Buy Now</a></div></div></div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="col-12 col-md-7">
          <div className="bb-inner-cart">
            <div className="bb-top-contact">
              <div className="bb-cart-title">
                <h4>My cart</h4>
                <div className="bb-cart-close" title="Close Cart" onClick={() => props.PopUp("cart")}></div>
              </div>
            </div>

            <div className="bb-cart-box item">
              {cartItems.length > 0 ? (
                <ul className="bb-cart-items">
                  {cartItems.map((item) => (
                    <li className="cart-sidebar-list" key={item.id}>
                      <a
                        onClick={() => removeItem(item.id)}
                        className="cart-remove-item"
                      >
                        <i className="ri-close-line"></i>
                      </a>
                      <a href="#" className="bb-cart-pro-img">
                        <img alt={item.name} src={item.img} />
                      </a>
                      <div className="bb-cart-contact">
                        <a
                          className="bb-cart-sub-title"
                          href="/product-left-sidebar/"
                        >
                          {item.name}
                        </a>
                        <span className="cart-price">
                          <span className="new-price">${item.price}</span> x{" "}
                          {item.unit}
                        </span>
                        <div className="qty-plus-minus">
                          <div
                            className="bb-qtybtn"
                            onClick={() => decreaseQty(item.id)}
                          >
                            -
                          </div>
                          <input
                            readOnly
                            className="qty-input location-select"
                            type="text"
                            value={item.qty}
                          />
                          <div
                            className="bb-qtybtn"
                            onClick={() => increaseQty(item.id)}
                          >
                            +
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Your cart is empty</p>
              )}
            </div>

            {/* Totals */}
            <div className="bb-bottom-cart">
              <div className="cart-sub-total">
                <table className="table cart-table">
                  <tbody>
                    <tr>
                      <td className="title">Sub-Total :</td>
                      <td className="price">${subTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="title">VAT (20%) :</td>
                      <td className="price">${vat.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="title">Total :</td>
                      <td className="price">${total.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="cart-btn">
                <Link className="bb-btn-1" to="/cart">
                  View Cart
                </Link>
                <Link className="bb-btn-2" to="/checkout">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SideCart;
