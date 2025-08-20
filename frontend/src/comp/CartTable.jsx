import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../comp/ProductsContext";
import { toast } from "react-toastify";
import api from "../api/useraxios";
import { Link } from "react-router-dom";

function CartTable() {
  const { products, cart, setCart, user } = useContext(ProductsContext);
  const ImgSrc = import.meta.env.VITE_IMG;

  const [cartItems, setCartItems] = useState([]);

  // Sync cart from context
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

  // Update cart
  const updateCart = async (updatedItem) => {
    try {
      if (!user?.email) {
        // Guest cart
        let guestCart = [...cart];
        if (updatedItem.quantity <= 0) {
          guestCart = guestCart.filter(
            (c) =>
              !(
                c._id === updatedItem.cartId ||
                `${c.productId}-${c.weight}` === updatedItem.cartId
              )
          );
        } else {
          guestCart = guestCart.map((c) =>
            c.productId === updatedItem.productId && c.weight === updatedItem.weight
              ? { ...c, quantity: updatedItem.quantity }
              : c
          );
        }
        sessionStorage.setItem("cart", JSON.stringify(guestCart));
        setCart(guestCart);
      } else {
        // User cart API
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

  // Qty actions
  const increaseQty = (cartId) => {
    const item = cartItems.find((i) => i.cartId === cartId);
    if (item) updateCart({ ...item, quantity: item.qty + 1 });
  };

  const decreaseQty = (cartId) => {
    const item = cartItems.find((i) => i.cartId === cartId);
    if (item) {
      if (item.qty > 1) {
        updateCart({ ...item, quantity: item.qty - 1 });
      } 
    }
  };

  const removeItem = (cartId) => {
    const item = cartItems.find((i) => i.cartId === cartId);
    if (item) {
      updateCart({ ...item, quantity: 0 });
      toast.info("Item removed from cart");
    }
  };

  return (
    <div className="col-lg-8 mb-4">
      <div className="bb-cart-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr key={item.cartId}>
                  <td>
                    <div className="Product-cart">
                      <img
                        src={ImgSrc + item.images[0]}
                        alt={item.productname}
                      />
                      <span>{item.productname}</span>
                    </div>
                  </td>
                  <td>₹{item.price[0].offerprice}</td>
                  <td>
                    <div className="qty-plus-minus">
                      <div
                        className="bb-qtybtn"
                        onClick={() => decreaseQty(item.cartId)}
                      >
                        -
                      </div>
                      <input
                        readOnly
                        className="qty-input"
                        value={item.qty}
                      />
                      <div
                        className="bb-qtybtn"
                        onClick={() => increaseQty(item.cartId)}
                      >
                        +
                      </div>
                    </div>
                  </td>
                  <td>
                    ₹{(item.qty * item.price[0].offerprice).toFixed(2)}
                  </td>
                  <td>
                    <div className="pro-remove">
                      <a onClick={() => removeItem(item.cartId)}>
                        <i className="ri-delete-bin-line"></i>
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Your cart is empty
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <Link className="bb-btn-2 check-btn" to="/checkout/"> 
        
          Check Out <i className="ri-shopping-cart-fill ms-2"></i>
        </Link>
      </div>
    </div>
  );
}

export default CartTable;
