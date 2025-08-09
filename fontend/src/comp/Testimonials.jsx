import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "react-tabs/style/react-tabs.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Testimonials() {
     const testimonials = [
    {
      image: '/src/img/testimonials/1.jpg',
      name: 'Isabella Oliver',
      role: 'Manager',
      message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto at sint eligendi possimus perspiciatis asperiores reiciendis hic amet alias aut quaerat maiores blanditiis.',
    },
    {
      image: '/src/img/testimonials/2.jpg',
      name: 'Nikki Albart',
      role: 'Team Leader',
      message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto at sint eligendi possimus perspiciatis asperiores reiciendis hic amet alias aut quaerat maiores blanditiis.',
    },
    {
      image: '/src/img/testimonials/3.jpg',
      name: 'Stephen Smith',
      role: 'Co Founder',
      message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto at sint eligendi possimus perspiciatis asperiores reiciendis hic amet alias aut quaerat maiores blanditiis.',
    },
  ];
  return (
    <section className="section-testimonials padding-tb-100 p-0-991">
        <div className="container">
          <div className="row">
            <div className="col-12 position-relative bb-testimonials">
              {/* Background Images */}
              <img className="testimonials-img-1" src="/src/img/testimonials/img-1.png" alt="bg" />
              <img className="testimonials-img-2" src="/src/img/testimonials/img-2.png" alt="bg" />
              <img className="testimonials-img-3" src="/src/img/testimonials/img-3.png" alt="bg" />
              <img className="testimonials-img-4" src="/src/img/testimonials/img-4.png" alt="bg" />
              <img className="testimonials-img-5" src="/src/img/testimonials/img-5.png" alt="bg" />
              <img className="testimonials-img-6" src="/src/img/testimonials/img-6.png" alt="bg" />

              <div className="inner-banner">
                <h4>Testimonials</h4>
              </div>

              {/* Preserve this wrapper OUTSIDE swiper */}
              <div className="bb-testimonials-inner">
                <Swiper
                  modules={[Autoplay]}
                  autoplay={false}
                  speed={1000}
                  loop
                  slidesPerView={1}
                  className="testimonials-slider"
                >
                  
                  {testimonials.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="row align-items-center" data-aos-once="true" data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-delay="200">
                        <div className="d-none-767 col-12 col-md-4">
                          <div className="testimonials-image">
                            <img src={item.image} alt={item.name} />
                          </div>
                        </div>
                        <div className="col-12 col-md-8">
                          <div className="testimonials-contact">
                            <div className="user">
                              <img src={item.image} alt={item.name} />
                              <div className="detail">
                                <h4>{item.name}</h4>
                                <span>({item.role})</span>
                              </div>
                            </div>
                            <div className="inner-contact">
                              <p>"{item.message}"</p>
                            </div>
                          </div>
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
  )
}

export default Testimonials