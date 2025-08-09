import React from "react";
import Title from "../comp/Title";
import Breadcrumb from "../comp/Breadcrum";

const Contact = () => {
  return (
    <>
    <Breadcrumb page={"Contact Us"}/>
    <section className="section-contact padding-tb-50">
      <div className="container">
        <div className="row mb-minus-24">
          {/* Title */}
          <div className="col-sm-12">
            <div className="css-zvi4ix" style={{ animationDelay: "200ms" }}>
              <Title
                main="Get In"
                special="Touch"
                sub="Please select a topic below related to your inquiry. If you don't find what you need, fill out our contact form."
                center={true}
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6 col-sm-12 mb-24">
            <div className="css-zvi4ix" style={{ animationDelay: "400ms" }}>
              <div className="bb-contact-form">
                <form noValidate>
                  <div className="bb-contact-wrap">
                    <input
                      type="text"
                      id="fname"
                      name="firstName"
                      className="form-control"
                      placeholder="Enter Your First Name"
                      required
                    />
                    <div className="invalid-feedback"></div>
                  </div>

                  <div className="bb-contact-wrap">
                    <input
                      type="text"
                      id="lname"
                      name="lastName"
                      className="form-control"
                      placeholder="Enter Your Last Name"
                      required
                    />
                    <div className="invalid-feedback"></div>
                  </div>

                  <div className="bb-contact-wrap">
                    <div className="input-group">
                      <input
                        type="email"
                        id="umail"
                        name="email"
                        className="form-control"
                        placeholder="Enter Your Email"
                        required
                      />
                      <div className="invalid-feedback"></div>
                    </div>
                  </div>

                  <div className="bb-contact-wrap">
                    <input
                      type="text"
                      id="phone"
                      name="phoneNumber"
                      className="form-control"
                      placeholder="Enter Your Phone Number"
                      pattern="^\d{10,12}$"
                      required
                    />
                    <div className="invalid-feedback"></div>
                  </div>

                  <div className="bb-contact-wrap">
                    <textarea
                      id="exampleFormControlTextarea1"
                      name="message"
                      rows="3"
                      className="form-control"
                      placeholder="Please leave your comments here..."
                      required
                    ></textarea>
                    <div className="invalid-feedback"></div>
                  </div>

                  <div className="bb-contact-button">
                    <button type="submit" className="bb-btn-2">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="col-lg-6 col-sm-12">
            <div className="css-zvi4ix" style={{ animationDelay: "600ms" }}>
              <div className="bb-contact-maps">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d929.6923186886103!2d72.9043573711624!3d21.240995949535076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1718947386404!5m2!1sen!2sin"
                  loading="lazy"
                  style={{ border: 0, width: "100%", height: "100%" }}
                  allowFullScreen
                  title="Google Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Contact;
