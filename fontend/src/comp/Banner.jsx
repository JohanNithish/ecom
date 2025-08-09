import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'; // include EffectFade
import 'swiper/css';
import 'animate.css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../assets/css/hero.css';
import Image from './Image';

function Banner({ categoryRef }) {

  const scrollToCategory = () => {
    categoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
    return (
        <section className="section-hero margin-b-50">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay, EffectFade]}
                            effect="fade"
                            fadeEffect={{ crossFade: true }}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: null,
                            }}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 4000 }}
                            loop
                            className="hero-slider"
                        >
                            {/* Slide 1 */}
                            <SwiperSlide>
                                <div className="mb-minus-24 row">
                                    <div className="col-12 order-lg-1 order-2 mb-24 col-lg-6">
                                        <div className="hero-contact">
                                            <p>Flat 30% Off</p>
                                            <h1>
                                                Explore <span>Healthy</span>
                                                <br /> &amp; Fresh Fruits
                                            </h1>
                                            <a className="bb-btn-1" href="shop-left-sidebar-col-3/index.html">Shop Now</a>
                                        </div>
                                    </div>
                                    <div className="col-12 order-lg-2 order-1 mb-24 col-lg-6">
                                        <div className="hero-image">
                                            <img className="animate__animated animate__fadeIn"
                                                src="img/hero/hero-1.png"
                                                alt="hero"
                                            />
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" className="your-custom-class"><defs><linearGradient id="shape_1" x1="100%" x2="0%" y1="100%" y2="0%"><stop offset="0%" stopColor="#ff7e5f"></stop><stop offset="100%" stopColor="#feb47b"></stop></linearGradient></defs><path fill="url(#shape_1)" d="M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45   c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2   c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7   c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z"></path></svg>
                                            <div className="hero-loader">
                                                <div className="spinner"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            {/* Slide 2 */}
                            <SwiperSlide>
                                <div className="mb-minus-24 row">
                                    <div className="col-12 order-lg-1 order-2 mb-24 col-lg-6">
                                        <div className="hero-contact">
                                            <p>Flat 20% Off</p>
                                            <h2>
                                                Explore <span>Warm</span>
                                                <br /> Fast Food &amp; Snacks
                                            </h2>
                                            <a className="bb-btn-1" href="shop-left-sidebar-col-3/index.html">Shop Now</a>
                                        </div>
                                    </div>
                                    <div className="col-12 order-lg-2 order-1 mb-24 col-lg-6">
                                        <div className="hero-image">
                                            <img className="animate__animated animate__fadeIn"
                                                src="img/hero/hero-2.png"
                                                alt="hero"
                                            />
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" className="your-custom-class"><defs><linearGradient id="shape_1" x1="100%" x2="0%" y1="100%" y2="0%"><stop offset="0%" stopColor="#ff7e5f"></stop><stop offset="100%" stopColor="#feb47b"></stop></linearGradient></defs><path fill="url(#shape_1)" d="M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45   c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2   c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7   c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z"></path></svg>
                                            <div className="hero-loader">
                                                <div className="spinner"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            {/* Slide 3 */}
                            <SwiperSlide>
                                <div className="mb-minus-24 row">
                                    <div className="col-12 order-lg-1 order-2 mb-24 col-lg-6">
                                        <div className="hero-contact">
                                            <p>Flat 30% Off</p>
                                            <h2>
                                                Explore <span>Organic</span>
                                                <br /> &amp; Fresh Vegetables
                                            </h2>
                                            <a className="bb-btn-1" href="shop-left-sidebar-col-3/index.html">Shop Now</a>
                                        </div>
                                    </div>
                                    <div className="col-12 order-lg-2 order-1 mb-24 col-lg-6">
                                        <div className="hero-image">
                                            <img className="animate__animated animate__fadeIn"
                                                src="img/hero/hero-3.png"
                                                alt="hero"
                                            />
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" className="your-custom-class"><defs><linearGradient id="shape_1" x1="100%" x2="0%" y1="100%" y2="0%"><stop offset="0%" stopColor="#ff7e5f"></stop><stop offset="100%" stopColor="#feb47b"></stop></linearGradient></defs><path fill="url(#shape_1)" d="M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45   c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2   c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7   c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z"></path></svg>
                                            <div className="hero-loader">
                                                <div className="spinner"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>

            <div className="bb-scroll-Page">
                <span className="scroll-bar">
                    <a href="#" onClick={(e) => { e.preventDefault(); scrollToCategory(); }}>Scroll Page</a>
                </span>
            </div>
        </section>
    );
}

export default Banner;
