import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "animate.css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperProduct from "../comp/SwiperProduct";
import Title from "../comp/Title";
import Breadcrumb from "../comp/Breadcrum";
import CartTable from "../comp/CartTable";
import CartSummary from "../comp/CartSummary";
import { ProductsContext } from "../comp/ProductsContext";

function Cart() {
  const { products } = useContext(ProductsContext);

  return (
    <>
      <Breadcrumb page={"Cart"} />
      <section className="section-cart padding-tb-50">
        <div className="container">
          <div className="row">
            {/* Cart Table */}
            

            {/* Summary Section */}
            <CartSummary />
            <CartTable />
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-deal padding-tb-50">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Title
                main={"New "}
                special={"Arrivals"}
                sub={"Browse The Collection of Top Products."}
                center={true}
              />
            </div>
            <div className="col-12">
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000 }}
                spaceBetween={24}
                loop
                slidesPerView={4}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
                className="bb-deal-slider"
              >
                {products.map((item, index) => (
                  <SwiperSlide key={index}>
                    <SwiperProduct product={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
