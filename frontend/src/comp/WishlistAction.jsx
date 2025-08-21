import React, { useContext } from "react";
import { toast } from "react-toastify";
import api from "../api/useraxios";
import { ProductsContext } from "./ProductsContext";

function WishlistAction({ id }) {
  const { user, wishlist, setWishlist } = useContext(ProductsContext);

  const handleWishlist = async () => {
    // ---- GUEST WISHLIST ----
    if (!user?.email) {
      let localWishlist = JSON.parse(sessionStorage.getItem("wishlist")) || [];
      let updatedWishlist;
      if (!localWishlist.includes(id)) {
        updatedWishlist = [...localWishlist, id];
        toast.success("Added to wishlist");
      } else {
        updatedWishlist = localWishlist.filter(item => item !== id);
        toast.info("Removed from wishlist");
      }
      sessionStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setWishlist(updatedWishlist);
      return;
    }

    // ---- USER WISHLIST ----
    if (user.role !== "user") {
      toast.error("Only users can add to wishlist!");
      return;
    }

    try {

      // Call API to add/remove from DB
      const res = await api.post(
        "/wishlist",
        { productId: id });
      if (wishlist<=res.data.products) {
        toast.success("Added to wishlist!");
      } else {
        toast.info("Removed from wishlist!");
      }
      setWishlist(res.data.products);
    } catch (err) {
      console.error("Wishlist error:", err);
      toast.error("Something went wrong!");
    }
  };

  // ---- ACTIVE STATE LOGIC ----
  const isWishlisted = wishlist.includes(id);

  return (
      <li
        className={`bb-btn-group ${isWishlisted ? "active" : ""}`}
        role="button"
        onClick={handleWishlist}
      >
        <div className="whishlist" title="Wishlist">
          <i className="ri-heart-line"></i>
        </div>
      </li>
  );
}

export default WishlistAction;
