import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "./ProductsContext";
import SwiperProduct from "./SwiperProduct";
import { toast } from "react-toastify";
import api from "../api/useraxios";

const SideCart = (props) => {
  const { products, cart, setCart, user } = useContext(ProductsContext);
  const ImgSrc = import.meta.env.VITE_IMG;

  const [cartItems, setCartItems] = useState([]);

  // 🔹 Sync cart with products
  useEffect(() => {
    if (cart && products.length > 0) {
      const cartProducts = cart
        .map((cartItem) => {
          const product = products.find(
            (p) => p.id === cartItem.productId || p._id === cartItem.productId
          );
          return product
            ? {
                ...product,
                qty: cartItem.quantity,
                weight: cartItem.weight,
                productId: cartItem.productId || product._id || product.id,
                cartId: cartItem._id || `${cartItem.productId}-${cartItem.weight}`,
              }
            : null;
        })
        .filter(Boolean);

      setCartItems(cartProducts);
    } else {
      setCartItems([]);
    }
  }, [products, cart]);

  // 🔹 Update cart (guest or user)
  const updateCart = async (updatedItem) => {
    try {
      if (!user?.email) {
        // Guest cart: sessionStorage
        let guestCart = [...cart];

        if (updatedItem.quantity <= 0) {
          // remove product
          guestCart = guestCart.filter(
            (c) =>
              !(
                c._id === updatedItem.cartId ||
                `${c.productId}-${c.weight}` === updatedItem.cartId
              )
          );
        } else {
          // update quantity
          guestCart = guestCart.map((c) =>
            c.productId === updatedItem.productId && c.weight === updatedItem.weight
              ? { ...c, quantity: updatedItem.quantity }
              : c
          );
        }

        sessionStorage.setItem("cart", JSON.stringify(guestCart));
        setCart(guestCart);
      } else {
        // User cart: update via API
        const res = await api.post("/cart/change", {
          productId: updatedItem.id || updatedItem.productId,
          weight: updatedItem.weight,
          quantity: updatedItem.quantity,
        });

        setCart(res.data.products || []);
      }
    } catch (err) {
      console.error("Cart update error:", err.response?.data);
      toast.error(
        "Failed to update cart: " + (err.response?.data?.message || err.message)
      );
    }
  };

  // 🔹 Increase quantity
  const increaseQty = (cartId) => {
    const item = cartItems.find((i) => i.cartId === cartId);
    if (item) {
      updateCart({ ...item, quantity: item.qty + 1 });
    }
  };

  // 🔹 Decrease quantity or remove
  const decreaseQty = (cartId) => {
    const item = cartItems.find((i) => i.cartId === cartId);
    if (item) {
      if (item.qty > 1) {
        updateCart({ ...item, quantity: item.qty - 1 });
      } 
    }
  };

  // 🔹 Remove item directly
  const removeItem = (cartId) => {
    const item = cartItems.find((i) => i.cartId === cartId);
    if (item) {
      updateCart({ ...item, quantity: 0 });
      toast.info("Item removed from cart");
    }
  };

  // 🔹 Calculate totals
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price[0].offerprice * item.qty,
    0
  );
  const vat = subTotal * 0.05;
  const total = subTotal + vat;

  return (
    <div
      className="bb-side-cart"
      ref={props.setref}
      onClick={(e) => props.closePopup("cart", e)}
    >
      <div className="row h-full row">
        {/* Related Items */}
        <div className="col-12 d-none-767 col-md-5">
          <div className="bb-top-contact">
            <div className="bb-cart-title">
              <h4>Related Items</h4>
            </div>
          </div>
          <div className="bb-cart-box mb-minus-24 cart-related bb-border-right gap-3">
            {products.length > 0 && (
              <SwiperProduct
                key={products[products.length - 1].id}
                product={products[products.length - 1]}
              />
            )}
            <div className="bb-cart-banner mb-24">
              <div className="banner">
                <img alt="cart-banner" src="/img/category/cart-banner.jpg" />
                <div className="detail">
                  <h4>Organic &amp; Fresh</h4>
                  <h3>Vegetables</h3>
                  <Link to="/product/Vegetable">Buy Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="col-12 col-md-7">
          <div className="bb-inner-cart">
            <div className="bb-top-contact">
              <div className="bb-cart-title">
                <h4>My cart</h4>
                <div
                  className="bb-cart-close"
                  title="Close Cart"
                  onClick={() => props.PopUp("cart")}
                ></div>
              </div>
            </div>

            <div className="bb-cart-box item">
              {cartItems.length > 0 ? (
                <ul className="bb-cart-items">
                  {cartItems.map((product) => (
                    <li className="cart-sidebar-list" key={product.cartId}>
                      <a
                        onClick={() => removeItem(product.cartId)}
                        className="cart-remove-item"
                      >
                        <i className="ri-close-line"></i>
                      </a>
                      <a href="#" className="bb-cart-pro-img">
                        <img
                          alt={product.productname}
                          src={ImgSrc + product.images[0]}
                        />
                      </a>
                      <div className="bb-cart-contact">
                        <a
                          className="bb-cart-sub-title"
                          href="/product-left-sidebar/"
                        >
                          {product.productname}
                        </a>
                        <span className="cart-price">
                          <span className="new-price">
                            ₹{product.price[0].offerprice}
                          </span>{" "}
                          x {product.weight}
                        </span>
                        <div className="qty-plus-minus">
                          <div
                            className="bb-qtybtn"
                            onClick={() => decreaseQty(product.cartId)}
                          >
                            -
                          </div>
                          <input
                            readOnly
                            className="qty-input location-select"
                            type="text"
                            value={product.qty}
                          />
                          <div
                            className="bb-qtybtn"
                            onClick={() => increaseQty(product.cartId)}
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
                      <td className="price">₹{subTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="title">GST (5%) :</td>
                      <td className="price">₹{vat.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="title">Total :</td>
                      <td className="price">₹{total.toFixed(2)}</td>
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
  );
};

export default SideCart;
