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
    const path = location.pathname.split("/").pop();
    const filteredProducts = path && path !== "product" ? products.filter((p) => p.category === path) : products;
    if (!filteredProducts || filteredProducts.length === 0) {
        return <Error404 />;
    }
    return (
        <>
            <Breadcrumb page={"Product List"} />
            <section className="section-contact padding-tb-50">
                <div className="container">
                    <div className="row mb-minus-24">
                        {/* Title */}
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
                        <div className="row">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>



                    </div>
                </div>
            </section>
        </>
    );
};

export default Product;
