import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const Product = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const productImages = [1, 2, 3, 4, 5].map((i) => `/src/img/new-product/${i}.jpg`);

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
  };

  const relatedProducts = [
  {
    id: 1,
    tag: "Hot",
    img: "/src/img/product/2.jpg",
    hoverImg: "/src/img/product/back-2.jpg",
    category: "Juice",
    title: "Organic Apple Juice Pack",
    newPrice: "$15",
    note: "3 Left",
    quantity: "100 ml",
  },
  {
    id: 2,
    tag: "",
    img: "/src/img/product/3.jpg",
    hoverImg: "/src/img/product/back-3.jpg",
    category: "Juice",
    title: "Mixed Almond nuts juice Pack",
    newPrice: "$39",
    oldPrice: "$32.00",
    quantity: "250 g",
  },
  {
    id: 3,
    tag: "Sale",
    img: "/src/img/product/4.jpg",
    hoverImg: "/src/img/product/back-4.jpg",
    category: "Fruits",
    title: "Fresh Mango Slice Juice",
    newPrice: "$25",
    note: "Out Of Stock",
    quantity: "100 ml",
  },
  {
    id: 4,
    tag: "",
    img: "/src/img/new-product/5.jpg",
    hoverImg: "/src/img/new-product/back-5.jpg",
    category: "Spices",
    title: "Black Pepper Spice pack",
    newPrice: "$22",
    oldPrice: "$32.00",
    quantity: "1 pack",
  },
  {
    id: 5,
    tag: "New",
    img: "/src/img/product/1.jpg",
    hoverImg: "/src/img/product/back-1.jpg",
    category: "Chocos",
    title: "Mixed Fruits Chocolates",
    newPrice: "$20",
    oldPrice: "$30.00",
    quantity: "1 Pack",
  },
];

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
                                <img className="iiz__img w-100" src={src} alt={`product-${index}`} />
                              </div>
                            </figure>
                          </div>
                        ))}
                      </Slider>

                      {/* Thumbnail Slider */}
                      <Slider {...thumbSliderSettings}>
                        {productImages.map((src, index) => (
                          <div key={index} className="single-slide">
                            <img className="img-responsive" src={src} alt={`thumb-${index}`} />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="col-12 mb-24 col-lg-7">
                    <div className="bb-single-pro-contact">
                      <div className="bb-sub-title">
                        <h4>Ground Nuts Oil Pack 52g</h4>
                      </div>
                      <div className="bb-single-rating">
                        <span className="bb-pro-rating">
                          {[...Array(4)].map((_, i) => (
                            <i key={i} className="ri-star-fill" />
                          ))}
                          <i className="ri-star-line" />
                        </span>
                        <span className="bb-read-review">
                          |&nbsp;&nbsp;<a href="#bb-spt-nav-review">992 Ratings</a>
                        </span>
                      </div>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>

                      <div className="bb-single-price-wrap">
                        <div className="bb-single-price">
                          <div className="price">
                            <h5>$923.00 <span>-78%</span></h5>
                          </div>
                          <div className="mrp">
                            <p>M.R.P. : <span>$1,999.00</span></p>
                          </div>
                        </div>
                        <div className="bb-single-price">
                          <div className="sku">
                            <h5>SKU#: WH12</h5>
                          </div>
                          <div className="stock">
                            <span>In stock</span>
                          </div>
                        </div>
                      </div>

                      <div className="bb-single-list">
                        <ul>
                          <li><span>Closure :</span> Hook & Loop</li>
                          <li><span>Sole :</span> Polyvinyl Chloride</li>
                          <li><span>Width :</span> Medium</li>
                          <li><span>Outer Material :</span> A-Grade Standard Quality</li>
                        </ul>
                      </div>

                      <div className="bb-single-pro-weight">
                        <div className="pro-title"><h4>Weight</h4></div>
                        <div className="bb-pro-variation-contant">
                          <ul>
                            {["250g", "500g", "1kg", "2kg"].map((weight, index) => (
                              <li key={weight} className={weight === "2kg" ? "active-variation" : ""}>
                                <span>{weight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bb-single-qty">
                        <div className="qty-plus-minus">
                          <div className="bb-qtybtn" style={{ marginLeft: "10px" }}>-</div>
                          <input readOnly className="qty-input location-select" type="text" value="13" name="gi-qtybtn" />
                          <div className="bb-qtybtn" style={{ marginRight: "10px" }}>+</div>
                        </div>
                        <div className="buttons">
                          <Link className="bb-btn-2" to="/cart">View Cart</Link>
                        </div>
                        <ul className="bb-pro-actions">
                          <li className="bb-btn-group"><a href="#"><i className="ri-heart-line" /></a></li>
                          <li className="bb-btn-group">
                            <a href="#" title="Quick view" data-bs-toggle="modal" data-bs-target="#bry_quickview_modal">
                              <i className="ri-eye-line" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs className="bb-single-pro-tab">
                 <ul className="bb-pro-tab" role="tablist">
        <TabList className="bb-pro-tab-nav nav">
          <Tab className="nav-item" selectedClassName="react-tabs__tab--selected">
            <a className="nav-link" data-bs-toggle="tab">Detail</a>
          </Tab>
          <Tab className="nav-item" selectedClassName="react-tabs__tab--selected">
            <a className="nav-link active" data-bs-toggle="tab" >Information</a>
          </Tab>
          <Tab className="nav-item" selectedClassName="react-tabs__tab--selected">
            <a className="nav-link" data-bs-toggle="tab" >Reviews</a>
          </Tab>
        </TabList>
      </ul>
  <TabPanel>
  <div className="tab-pane fade show active" role="tabpanel" id="detail">
    <div className="bb-inner-tabs">
      <div className="bb-details">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, voluptatum.
          Vitae dolores alias repellat eligendi, officiis, exercitationem corporis quisquam delectus
          cum non recusandae numquam dignissimos molestiae magnam hic natus. Cumque.
        </p>
        <div className="details-info">
          <ul>
            <li>Any Product types that You want - Simple, Configurable</li>
            <li>Downloadable/Digital Products, Virtual Products</li>
            <li>Inventory Management with Backordered items</li>
            <li>Flatlock seams throughout.</li>
          </ul>
          <ul>
            <li><span>Highlights</span>Form FactorWhole</li>
            <li><span>Seller</span>No Returns Allowed</li>
            <li><span>Services</span>Cash on Delivery available</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</TabPanel>


  <TabPanel>
  <div className="tab-pane fade show active" role="tabpanel" id="information">
    <div className="bb-inner-tabs">
      <div className="information">
        <ul>
          <li><span>Weight</span> 500 g</li>
          <li><span>Dimensions</span> 17 × 15 × 3 cm</li>
          <li><span>Color</span> black, yellow, red</li>
          <li><span>Brand</span> Wonder Fort</li>
          <li><span>Form Factor</span> Whole</li>
          <li><span>Quantity</span> 1</li>
          <li><span>Container Type</span> Pouch</li>
          <li><span>Shelf Life</span> 12 Months</li>
          <li><span>Ingredients</span> Dalchini, Dhaniya, Badi Elaichi, Laung</li>
          <li><span>Other Features</span> Ingredient Type: Vegetarian</li>
        </ul>
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
              {relatedProducts.map((product) => (
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

export default Product;
