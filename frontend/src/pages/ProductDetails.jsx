import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import Breadcrumb from "../comp/Breadcrum";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-tabs/style/react-tabs.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SwiperProduct from "../comp/SwiperProduct";
import Title from "../comp/Title";
import { ProductsContext } from '../comp/ProductsContext';
import ProductDetailsBox from "../comp/ProductDetailsBox";
import api from "../api/useraxios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState(null);
  const location = useLocation();
  // setProductDetails(null);
    const url = location.pathname.split("/").pop();
  useEffect(() => {
    api.get(`/productdetails/${url}`)
      .then(res => {
        if (res.data.success) setProductDetails(res.data.data || []);
      })
      .catch(err => console.error(err));
  }, [url]);



  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const { products } = useContext(ProductsContext);


  const mainSliderSettings = {
    asNavFor: nav2,
    ref: (slider) => setNav1(slider),
    slidesToShow: 1,
    fade: true,
    arrows: false,
  };

 const thumbSliderSettings = {
  asNavFor: nav1,
  ref: (slider) => setNav2(slider),
  slidesToShow: 4,
  swipeToSlide: true,
  focusOnSelect: true,
  arrows: true,
  className: "single-nav-thumb",
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2
      }
    }
  ],
};

  if (!productDetails) return <><Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box></>;

// Assuming details.images comes from product data
let productImages = productDetails.images || [];

// Repeat images until we have 5
while (productImages.length < 5) {
  productImages = productImages.concat(productImages);
}

// Only take first 5
productImages = productImages.slice(0, 5);

const ImgSrc = import.meta.env.VITE_IMG;
  return (
    <>
      <Breadcrumb page={"Product Details"} />
      <section className="section-product padding-tb-50">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="bb-single-pro">
                <div className="row">
                  {/* Product Image Carousel */}
                  <div className="col-12 mb-24 col-lg-5 col-sm-12">
  <div className="single-pro-slider">
    {/* Main Image Slider */}
    <Slider {...mainSliderSettings}>
      {productImages.map((src, index) => (
        <div key={index} className="single-slide zoom-image-hover">
          <figure className="iiz">
            <div>
              <img className="iiz__img w-100" src={ImgSrc+src} alt={`product-${index}`} />
            </div>
          </figure>
        </div>
      ))}
    </Slider>

    {/* Thumbnail Slider */}
    <Slider {...thumbSliderSettings}>
      {productImages.map((src, index) => (
        <div key={index} className="single-slide">
          <img className="/img-responsive" src={ImgSrc+src} alt={`thumb-${index}`} />
        </div>
      ))}
    </Slider>
  </div>
</div>


                  {/* Product Info */}
                 <ProductDetailsBox details={productDetails} />
                </div>

                {/* Tabs */}
                <Tabs className="bb-single-pro-tab">
                 <ul className="bb-pro-tab" role="tablist">
        <TabList className="bb-pro-tab-nav nav">
          <Tab className="nav-item" selectedClassName="react-tabs__tab--selected">
            <a className="nav-link" data-bs-toggle="tab">Detail</a>
          </Tab>
          <Tab className="nav-item" selectedClassName="react-tabs__tab--selected">
            <a className="nav-link" data-bs-toggle="tab" >Information</a>
          </Tab>
          <Tab className="nav-item" selectedClassName="react-tabs__tab--selected">
            <a className="nav-link" data-bs-toggle="tab" >Reviews</a>
          </Tab>
        </TabList>
      </ul>
  <TabPanel>
  <div className="tab-pane fade show active" role="tabpanel" id="detail">
    <div className="bb-inner-tabs">
      <div className="bb-details" dangerouslySetInnerHTML={{ __html: productDetails.detail }}>
      </div>
    </div>
  </div>
</TabPanel>


  <TabPanel>
  <div className="tab-pane fade show active" role="tabpanel" id="information">
    <div className="bb-inner-tabs">
      <div className="information" dangerouslySetInnerHTML={{ __html: productDetails.information }}>
      </div>
    </div>
  </div>
</TabPanel>


  <TabPanel>
    <div className="tab-content">
      <div className="tab-pane show active">
        <div className="container">
          <p>
            Please <Link to="/login" style={{ color: "blue" }}>login</Link> or <Link to="/register" style={{ color: "blue" }}>register</Link> to review the blog comments.
          </p>
        </div>
      </div>
    </div>
  </TabPanel>
</Tabs>

              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="section-deal padding-tb-50">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Title main={"Related"} special={"Product"} sub={"Browse The Collection of Top Products."} center={true}/>
          </div>
          <div className="col-12">
            <Swiper
              spaceBetween={30}
              slidesPerView={4}
              loop={true}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className="bb-deal-slider"
            >
              {products.filter((p) => p.category === productDetails.category && p.url != productDetails.url).map((product) => (
                <SwiperSlide key={product.id}>
                  <SwiperProduct product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ProductDetails;
