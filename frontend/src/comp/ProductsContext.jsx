import { createContext, useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { gql, useLazyQuery } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import api from "../api/useraxios";

// Context
export const ProductsContext = createContext();

// GraphQL query
const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      category
      deal
      productname
      url
      sku
      images
      isdeal
      price {
        mrp
        offerprice
        stock
        metric
      }
    }
  }
`;

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(
    JSON.parse(sessionStorage.getItem("wishlist")) || []
  );
  const [cart, setCart] = useState(
    JSON.parse(sessionStorage.getItem("cart")) || []
  );
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    role: ""
  });
  const [getProducts] = useLazyQuery(GET_PRODUCTS);

  const fetchProducts = useCallback(async () => {
    try {
      // ✅ Check token
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const decoded = jwtDecode(token);

          // 🔹 Only allow role = "user"
          if (decoded.role === "user") {
            setUser({
              id: decoded.id,
              username: decoded.username,
              email: decoded.email,
              role: decoded.role,
            });
          } else {
            setUser();
          }
        } catch (err) {
          console.error("Invalid token:", err);
          setUser();
        }
      } else {
        setUser();
      }

      // ✅ Fetch products
      const res = await getProducts();
      if (res?.data?.products) {
        setProducts(res.data.products || []);
      } else {
        toast.error("No products found");
      }
    } catch (err) {
      toast.error(err.message || "Error fetching products");
    }
  }, [getProducts]);

  useEffect(() => {
    const loadData = async () => {
      await fetchProducts();

      const token = localStorage.getItem("accessToken");
      if (!token) {
        setWishlist(JSON.parse(sessionStorage.getItem("wishlist")) || []);
        setCart(JSON.parse(sessionStorage.getItem("cart")) || []);
        return;
      }

      try {
        // ✅ Fetch Wishlist
        const resWish = await api.get("/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (resWish.data?.products) {
          setWishlist(resWish.data.products);
        }

        // ✅ Fetch Cart
        const resCart = await api.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (resCart.data?.products) {
          setCart(resCart.data.products);
        }
      } catch (err) {
        console.error("Data fetch failed:", err);
        setWishlist(JSON.parse(sessionStorage.getItem("wishlist")) || []);
        setCart(JSON.parse(sessionStorage.getItem("cart")) || []);
      }
    };

    loadData();
  }, [fetchProducts]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        user,
        wishlist,
        setWishlist,
        cart,
        setCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsProvider;
