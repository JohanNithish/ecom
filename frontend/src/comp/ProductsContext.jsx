import { createContext, useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { gql, useLazyQuery } from "@apollo/client";

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
  const [getProducts, { error }] = useLazyQuery(GET_PRODUCTS);

  const fetchProducts = useCallback(async () => {
    try {
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
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductsContext.Provider value={{ products, setProducts, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsProvider;
