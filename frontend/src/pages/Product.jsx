import React, { useContext } from "react";
import Title from "../comp/Title";
import Breadcrumb from "../comp/Breadcrum";
import ProductCard from "../comp/ProductCard";
import { useLocation } from "react-router-dom";
import { ProductsContext } from "../comp/ProductsContext";
import Error404 from "./Error404";

const Product = () => {
  const { products } = useContext(ProductsContext);

  const location = useLocation();
  const path = location.pathname.split("/").pop(); // e.g. /product/Nike → "Nike"

  let filteredProducts = products;

  if (path && path !== "product") {
    // First check if path matches a category
    const categoryMatches = products.filter(
      (p) => p.category.toLowerCase() === path.toLowerCase()
    );

    if (categoryMatches.length > 0) {
      filteredProducts = categoryMatches;
    } else {
      // Otherwise treat as a search keyword
      filteredProducts = products.filter((p) =>
        p.productname.toLowerCase().includes(path.toLowerCase())
      );
    }
  }

  if (!filteredProducts || filteredProducts.length === 0) {
    return <Error404 />;
  }

  return (
    <>
      <Breadcrumb page={"Product List"} />
      <section className="section-contact padding-tb-50">
        <div className="container">
          <div className="row mb-minus-24">
            <div className="col-sm-12">
              <div className="css-zvi4ix">
                <Title
                  main="Best"
                  special="Offer"
                  sub="Check latest offers for you"
                  center={true}
                />
              </div>
            </div>
          </div>
            <div className="row">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
        </div>
      </section>
    </>
  );
};

export default Product;
