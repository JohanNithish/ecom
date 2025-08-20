import React, { useContext } from "react";
import { toast } from "react-toastify";
import api from "../api/useraxios";
import { ProductsContext } from "./ProductsContext";

function CartAction({ product, weight = null, quantity = 1 }) {
  const { user, cart, setCart } = useContext(ProductsContext);

  const handleCart = async () => {
    const productId = product.id || product._id; // normalize id

    // ---- GUEST CART ----
    if (!user?.email) {
      let localCart = JSON.parse(sessionStorage.getItem("cart")) || [];

      // Always find by productId + weight
      const existingIndex = localCart.findIndex(
        item => item.productId === productId && item.weight === weight
      );

      if (existingIndex !== -1) {
        // ✅ Update quantity
        localCart[existingIndex].quantity += quantity;
        toast.info("Updated cart quantity");
      } else {
        // ✅ Always include productId
        localCart.push({ productId, weight, quantity });
        toast.success("Added to cart");
      }

      sessionStorage.setItem("cart", JSON.stringify(localCart));
      setCart(localCart);
      return;
    }

    // ---- USER CART ----
    if (user.role !== "user") {
      toast.error("Only users can add to cart!");
      return;
    }

    try {
      const res = await api.post(
        "/cart",
        { productId, weight, quantity },
        { withCredentials: true }
      );

      setCart(res.data.products);
      toast.success("Cart updated!");
    } catch (err) {
      console.error("Cart error:", err);
      toast.error("Something went wrong!");
    }
  };

  const isInCart = cart.some(
    item => item.productId === (product.id || product._id) && item.weight === weight
  );

  return (
    <li
      className={`bb-btn-group ${isInCart ? "active" : ""}`}
      role="button"
      onClick={handleCart}
    >
      <div title="Add To Cart">
        <i className="ri-shopping-bag-4-line"></i>
      </div>
    </li>
  );
}

export default CartAction;
