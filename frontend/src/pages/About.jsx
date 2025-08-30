import React from "react";
import Breadcrumb from "../comp/Breadcrum";
import Title from "../comp/Title";
import Service from "../comp/Service";
import Testimonials from "../comp/Testimonials";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const About = () => {
 const teamMembers = [
  {
    name: 'Elena Wilson',
    role: 'Manager',
    image: 'img/team/1.jpg',
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Mario Bisop',
    role: 'CEO',
    image: 'img/team/2.jpg',
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Maria Margret',
    role: 'Co-Founder',
    image: 'img/team/3.jpg',
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Juliat Hilson',
    role: 'Team Leader',
    image: 'img/team/4.jpg',
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
    },
  },
];
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 767, settings: { slidesToShow: 1 } },
    ],
  };
  return (
    <>
    <Breadcrumb page={"About Us"}/>
    <section className="section-about padding-tb-50">
      <div className="container">
        <div className="row mb-minus-24">
          {/* Left Column - Image */}
          <div className="col-12 col-lg-6 mb-24">
            <div className="bb-about-img text-center">
              <img src="/img/one.png" className="w-50" alt="about-one" />
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="col-12 col-lg-6 mb-24">
            <div className="bb-about-contact">
              
              <Title main={"About the"} special={"Green Cart"}  center={false}/>

              {/* Description */}
              <div>
                <div className="about-inner-contact text-justify">
                  <h4>Farm-fresh Goodness, just a click Away.</h4>
                  <p>
                    Green Cart brings you the finest selection of fresh, organic, and high-quality products right to your doorstep. We believe that healthy living starts with access to pure and natural food, which is why every item we deliver is handpicked for freshness and taste. From farm to home, our promise is simple — freshness, trust, and convenience with every order.
                  </p>
                  <p>
                    Green Cart is more than just an online store; it’s your everyday companion for better living. Whether you’re shopping for fruits, vegetables, snacks, or beverages, we make sure you experience the joy of healthy and hassle-free shopping. With us, you get the perfect balance of quality, variety, and reliability — because your family deserves nothing less.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div>
                <div className="row bb-vendor-rows mb-minus-24">
                  <div className="col-sm-4">
                    <div className="bb-vendor-box">
                      <div className="bb-count">
                        <h5 className="counter">275 +</h5>
                      </div>
                      <div className="inner-text">
                        <p>vendors</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="bb-vendor-box">
                      <div className="bb-count">
                        <h5 className="counter">1.5M +</h5>
                      </div>
                      <div className="inner-text">
                        <p>Sales</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="bb-vendor-box">
                      <div className="bb-count">
                        <h5 className="counter">754k +</h5>
                      </div>
                      <div className="inner-text">
                        <p>Customers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> {/* Stats End */}
            </div>
          </div> {/* Right Column End */}
        </div>
      </div>
    </section>
    
    <Title main={"Our "} special={"Services"} sub={"Customer service should not be a department. It should be the entire company.."} center={true}/>
    <Service/>
    <Testimonials/>
     <section className="section-team padding-tb-50">
      <div className="container">
        <div className="row">
          {/* Title */}
          <div className="col-12">
            <div className="section-title bb-center">
              <div className="section-detail">
                <h2 className="bb-title">Our <span>Team</span></h2>
                <p>Meet our expert team members.</p>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="col-12">
            <Slider {...settings} className="bb-team">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="bb-team-box">
                  <div className="bb-team-img">
                    <div className="bb-team-socials">
                      <div className="inner-shape"></div>
                      <ul>
                        <li className="bb-social-link">
                          <a href={member.social.facebook}><i className="ri-facebook-fill"></i></a>
                        </li>
                        <li className="bb-social-link">
                          <a href={member.social.twitter}><i className="ri-twitter-x-fill"></i></a>
                        </li>
                        <li className="bb-social-link">
                          <a href={member.social.linkedin}><i className="ri-linkedin-fill"></i></a>
                        </li>
                      </ul>
                    </div>
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="bb-team-contact">
                    <h5>{member.name}</h5>
                    <p>{member.role}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default About;
