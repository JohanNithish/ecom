import React, { useContext, useRef } from 'react';
import '../index.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import 'swiper/css';
import 'animate.css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../assets/css/hero.css';
import Banner from '../comp/Banner';
import ProductCard from '../comp/ProductCard';
import VendorCard from '../comp/VendorCard';
import SwiperProduct from '../comp/SwiperProduct';
import Title from '../comp/Title';
import Service from '../comp/Service';
import Testimonials from '../comp/Testimonials';
import { ProductsContext } from '../comp/ProductsContext';



function Home() {
  const { products } = useContext(ProductsContext);


  const categoryRef = useRef(null);

  const categories = [
    {
      title: "Fruits",
      items: 291,
      img: "/img/category/2.svg",
    },
    {
      title: "Cold Drinks",
      items: 49,
      img: "/img/category/3.svg",
    },
    {
      title: "Bakery",
      items: 8,
      img: "/img/category/4.svg",
    },
    {
      title: "Fast Food",
      items: 291,
      img: "/img/category/5.svg",
    },
    {
      title: "Snacks",
      items: 49,
      img: "/img/category/6.svg",
    },
    {
      title: "Vegetables",
      items: 485,
      img: "/img/category/1.svg",
    },
  ];



  const vendors = [
    {
      id: 0,
      name: 'Mira Blue Pvt. Ltd.',
      sales: 587,
      categories: 'Fruits (5) | Vegetables (30) | Snacks (09)',
      mainImage: 'img/vendors/img-1.jpg',
      vendorImage: 'img/vendors/vendor-1.jpg',
    },
    {
      id: 1,
      name: 'Eelna Pvt. Ltd.',
      sales: 428,
      categories: 'Fruits (8) | Vegetables (15) | Snacks (04)',
      mainImage: 'img/vendors/img-2.jpg',
      vendorImage: 'img/vendors/vendor-2.jpg',
    },
    {
      id: 2,
      name: 'Jain Versa Pvt. Ltd.',
      sales: 1024,
      categories: 'Fruits (16) | Vegetables (42) | Snacks (18)',
      mainImage: 'img/vendors/img-3.jpg',
      vendorImage: 'img/vendors/vendor-3.jpg',
    },
    {
      id: 3,
      name: 'Maria Rambo Pvt. Ltd.',
      sales: 210,
      categories: 'Fruits (2) | Vegetables (10) | Snacks (03)',
      mainImage: 'img/vendors/img-4.jpg',
      vendorImage: 'img/vendors/vendor-4.jpg',
    },
  ];
  const instagramImages = [
    'img/instagram/1.jpg',
    'img/instagram/2.jpg',
    'img/instagram/3.jpg',
    'img/instagram/4.jpg',
    'img/instagram/5.jpg',
    'img/instagram/6.jpg'
  ];

  return (
    <>
      <Banner categoryRef={categoryRef} />
      <section className="section-category padding-tb-50" ref={categoryRef}>
        <div className="container">
          <div className="mb-minus-24 row">
            <div className="col-12 mb-24 col-lg-5">
              <div className="bb-category-img">
                <img alt="category" src="/img/category/category.jpg" />
                <div className="bb-offers">
                  <span>50% Off</span>
                </div>
              </div>
            </div>

            <div className="col-12 mb-24 col-lg-7">
              <div className="bb-category-contact">
                <div
                  className="category-title" data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="500">
                  <h2 >Explore Categories</h2>
                </div>
                <Swiper
                  modules={[Autoplay]}
                  slidesPerView={4}
                  spaceBetween={24}
                  autoplay={{ delay: 4000 }}
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                  }}
                  loop
                  className="bb-category-block">

                  {categories.map((category, index) => (
                    <SwiperSlide>

                      <div
                        className={`bb-category-box category-items-${(index % 4) + 1}`}
                        data-aos="flip-left"
                        data-aos-duration="1000"
                        data-aos-delay="200"
                      >
                        <div className="category-image">
                          <img alt="category" src={category.img} />
                        </div>
                        <div className="category-sub-contact">
                          <h5>
                            <div className="text-heading">
                              {category.title}
                            </div>
                          </h5>
                          <p>{category.items} items</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}

                </Swiper>

              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-deal padding-tb-50">
        <div className="container">
          <div className="row">
            {/* Section Title */}
            <div className="col-12">

              <Title main={"Day of the"} special={"deal"} sub={"Don't wait. The time will never be just right."} center={false}>
                {/* Timer UI (Static or Replace with Countdown Library) */}
                <div id="dealend" className="dealend-timer">
                  <div className="dealend-timer">
                    <div className="time-block">
                      <div className="time">25</div>
                      <span className="day">Days</span>
                    </div>
                    <div className="time-block">
                      <div className="time">23</div>
                      <span className="dots">:</span>
                    </div>
                    <div className="time-block">
                      <div className="time">56</div>
                      <span className="dots">:</span>
                    </div>
                    <div className="time-block">
                      <div className="time">19</div>
                    </div>
                  </div>
                </div>
              </Title>
            </div>

            {/* Swiper Section */}
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
                {products.filter((p) => p.isdeal === 1).map((item, index) => (
                  <SwiperSlide key={index}>
                    <SwiperProduct product={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <section className="section-banner-one padding-tb-50">
        <div className="container">
          <div className="mb-minus-24 row">
            <div className="mb-24 col-12 col-lg-6">
              <div data-aos="fade-up"
                data-aos-duration="500" data-aos-once="true"
                data-aos-delay="600" className="css-zvi4ix">
                <div className="banner-box bg-box-color-one">
                  <div className="inner-banner-box">
                    <div className="side-image">
                      <img src="/img/banner/one.png" alt="one" />
                    </div>
                    <div className="inner-contact">
                      <h5>Tasty Snack &amp; Fast Juice</h5>
                      <p>The flavour of something special</p>
                      <a className="bb-btn-1" href="/shop-left-sidebar-col-3/">
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-24 col-12 col-lg-6">
              <div data-aos="fade-up"
                data-aos-duration="500" data-aos-once="true"
                data-aos-delay="600" className="css-zvi4ix">
                <div className="banner-box bg-box-color-two">
                  <div className="inner-banner-box">
                    <div className="side-image">
                      <img src="/img/banner/two.png" alt="two" />
                    </div>
                    <div className="inner-contact">
                      <h5>Fresh Fruits &amp; Vegetables</h5>
                      <p>A healthy meal for every one</p>
                      <a className="bb-btn-1" href="/shop-left-sidebar-col-3/">
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="section-banner-two margin-tb-50">
        <div className="container">
          <div className="row">
            <div className="banner-justify-box-contact col-12">
              <div className="banner-two-box">
                <span>25% Off</span>
                <h4>Fresh &amp; Organic vegetables</h4>
                <a href="#" className="bb-btn-1">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-product-tabs padding-tb-50">
        <div className="container">
          <Tabs className="react-tabs" defaultIndex={0}>
            <div className="row">
              <div className="col-12">
                <div className="css-zvi4ix" style={{ animationDelay: '200ms' }}>
                  <Title main={"New"} special={"Arrivals"} sub={"Shop online for new arrivals and get free shipping!"} center={false}>
                    <div className="bb-pro-tab">
                      <TabList className="bb-pro-tab-nav nav">
                        <Tab className="nav-item" selectedClassName="react-tabs__tab--selected">
                          <a className="nav-link">All</a>
                        </Tab>
                        <Tab className="nav-item" selectedClassName="react-tabs__tab--selected">
                          <a className="nav-link">Spices</a>
                        </Tab>
                        <Tab className="nav-item" selectedClassName="react-tabs__tab--selected">
                          <a className="nav-link">Drinks & Snack</a>
                        </Tab>
                        <Tab className="nav-item" selectedClassName="react-tabs__tab--selected">
                          <a className="nav-link">Fruits</a>
                        </Tab>
                        <Tab className="nav-item" selectedClassName="react-tabs__tab--selected">
                          <a className="nav-link">Groceries & Vegetable</a>
                        </Tab>
                      </TabList>
                    </div>
                  </Title>
                </div>
              </div>
            </div>
            <div className="mb-minus-24 row">
              <div className="col-12">
                <div className="tab-content">
                  <TabPanel>
                    <div className="row">
                      {products.slice(0, 12).map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="row">
                      {products
                        .filter((p) => p.category === 'Spices')
                        .map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="row">
                      {products
                        .filter((p) => p.category === 'Juice' || p.category === 'Beverages' || p.category === 'Chips')
                        .map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="row">
                      {products
                        .filter((p) => p.category === 'Fruits')
                        .map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="row">
                      {products
                        .filter((p) => p.category === 'Groceries' || p.category === 'Vegetable')
                        .map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                  </TabPanel>

                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </section>
      <Service />

      <section className="section-vendors padding-t-50 padding-b-100">
        <div className="container">
          <Tabs className="react-tabs" defaultIndex={0}>
            <div className="mb-minus-24 row">
              <div className="col-12">
                <Title main={"Top"} special={"Vendors"} sub={"Discover Our Trusted Partners: Excellence & Reliability in Every choice"} center={true} />
              </div>
              <div className="col-lg-5 col-12 mb-24 css-zvi4ix">
                <div className="tab-content">
                  {vendors.map((vendor) => (
                    <TabPanel key={vendor.id} >
                      <VendorCard vendor={vendor} />
                    </TabPanel>
                  ))}
                </div>
              </div>
              <div className="col-lg-7 col-12 mb-24">
                <TabList className="bb-vendors-tab-nav" role="tablist">
                  {vendors.map((vendor, index) => (
                    <Tab
                      key={vendor.id}
                      className="nav-item"
                      selectedClassName="react-tabs__tab--selected"
                      style={{ outline: 'none' }}
                    >
                      <div data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-delay={{ animationDelay: `${200 + index * 300}` }} >
                        <a className="nav-link" data-bs-toggle="tab" href={`#vendors_tab_${index}`}>
                          <div className="bb-vendors-box">
                            <div className="inner-heading">
                              <h5>{vendor.name}</h5>
                              <span>Sales - {vendor.sales}</span>
                            </div>
                            <p>{vendor.categories}</p>
                          </div>
                        </a>
                      </div>
                    </Tab>
                  ))}
                </TabList>
              </div>
            </div>
          </Tabs>
        </div>
      </section>
      <Testimonials />
      <section className="section-instagram padding-tb-50">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bb-title">
                <h3>#Insta</h3>
              </div>

              <Swiper
                modules={[Autoplay]}
                spaceBetween={24}
                slidesPerView={4}
                loop={false}
                autoplay={false}
                speed={1000}
                breakpoints={{
                  320: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 6 }
                }}
                className="bb-instagram-slider"
              >
                {instagramImages.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="bb-instagram-card">
                      <div className="instagram-img">
                        <a href="#">
                          <img src={img} alt={`instagram-${idx + 1}`} />
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Home