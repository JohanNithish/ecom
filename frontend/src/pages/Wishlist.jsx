import { useContext } from "react";
import Breadcrumb from "../comp/Breadcrum";
import ProductCard from "../comp/ProductCard";
import { ProductsContext } from '../comp/ProductsContext';

function Wishlist() {
  const { products } = useContext(ProductsContext);

  return (

    <>
      <Breadcrumb page={"Wishlist"} />
      <section className="section-wishlist padding-tb-50">
        <div className="container">
          <div className="mb-minus-24 bb-wish-rightside row">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} wishlist={true} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export default Wishlist
