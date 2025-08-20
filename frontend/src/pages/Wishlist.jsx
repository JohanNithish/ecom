import { useContext, useState, useEffect } from "react";
import Breadcrumb from "../comp/Breadcrum";
import ProductCard from "../comp/ProductCard";
import { ProductsContext } from '../comp/ProductsContext';
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import api from "../api/useraxios"; // your axios instance

function Wishlist() {
  const { products, wishlist, setWishlist } = useContext(ProductsContext);

  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    const wishlistProducts = products.filter(product =>
      wishlist.includes(product.id || product._id)
    );
    setDisplayedProducts(wishlistProducts);
  }, [products, wishlist]);

  // Reusable remove from wishlist function
  const handleRemoveWishlist = async (productId) => {
    // Remove from displayed cards immediately
    setDisplayedProducts(prev => prev.filter(p => p.id !== productId && p._id !== productId));

    const token = localStorage.getItem("accessToken");

    // Guest: remove from sessionStorage
    if (!token) {
      const localWishlist = JSON.parse(sessionStorage.getItem("wishlist")) || [];
      const updatedWishlist = localWishlist.filter(item => item !== productId);
      sessionStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setWishlist(updatedWishlist);
      toast.info("Removed from wishlist");
      return;
    }

    // User: remove from backend
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "user") {
        toast.error("Only users can modify wishlist!");
        return;
      }

      const res = await api.post("/wishlist", { productId }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      let updatedList;
      if (!res.data.added) { // removed from wishlist
        updatedList = wishlist.filter(item => item !== productId);
        setWishlist(updatedList);
        toast.info("Removed from wishlist!");
      }
    } catch (err) {
      console.error("Wishlist remove error:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Breadcrumb page={"Wishlist"} />
      <section className="section-wishlist padding-tb-50">
        <div className="container">
          <div className="mb-minus-24 bb-wish-rightside row">
            {displayedProducts.length > 0 ? (
              displayedProducts.map(product => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                  wishlist={true}
                  onRemove={() => handleRemoveWishlist(product.id || product._id)}
                />
              ))
            ) : (
              <p>Your wishlist is empty.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Wishlist;
