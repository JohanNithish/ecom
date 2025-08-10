import React from 'react';
import Breadcrumb from '../comp/Breadcrum';


const Checkout = () => {
  return (
    <>
      <Breadcrumb page="Checkout" />

      <section className="section-checkout padding-tb-50">
        <div className="container">
          <div className="row mb-minus-24">

            {/* Sidebar Summary */}
            <div className="col-lg-4 col-sm-12 mb-24" data-aos="fade-up"
                        data-aos-duration="500" data-aos-once="true"
                        data-aos-delay="500">
              <div className="bb-checkout-sidebar">
                <div className="css-zvi4ix" style={{ animationDelay: '200ms' }}>

                  {/* Order Summary */}
                  <div className="checkout-items">
                    <div className="sub-title"><h4>Summary</h4></div>
                    <div className="checkout-summary">
                      <ul>
                        <li><span className="left-item">Sub-total</span><span>$141.00</span></li>
                        <li><span className="left-item">Delivery Charges</span><span>$28.20</span></li>
                        <li>
                          <span className="left-item">Coupon Discount</span>
                          <span><a href="#" className="apply drop-coupon">Apply Coupon</a></span>
                        </li>
                        <li>
                          <div className="coupon-down-box">
                            <form method="post">
                              <input className="bb-coupon" type="text" placeholder="Coupon Code" required />
                              <button type="submit" className="bb-btn-2 rtl-btn">Apply</button>
                            </form>
                          </div>
                        </li>
                      </ul>
                      <div className="summary-total">
                        <ul>
                          <li><span className="text-left">Total Amount</span><span className="text-right">$169.20</span></li>
                        </ul>
                      </div>
                    </div>

                    {/* Product Items */}
                    <div className="bb-checkout-pro">
                      {[{
                        name: "Black Pepper Spice pack",
                        price: "$32",
                        oldPrice: "$22.00",
                        rating: 4,
                        img: "/img/new-product/5.jpg"
                      }, {
                        name: "Small Cardamom Spice Pack",
                        price: "$41",
                        oldPrice: "$45.00",
                        rating: 5,
                        img: "/img/new-product/6.jpg"
                      }, {
                        name: "Chilli Flakes Pack",
                        price: "$29",
                        oldPrice: "$31.00",
                        rating: 2,
                        img: "/img/new-product/7.jpg"
                      }, {
                        name: "Tomato Ketchup Pack",
                        price: "$9",
                        oldPrice: "$10.00",
                        rating: 4,
                        img: "/img/new-product/8.jpg"
                      }, {
                        name: "Organic Apple Juice Pack",
                        price: "$15",
                        oldPrice: "",
                        rating: 4,
                        img: "/img/product/2.jpg"
                      }].map((product, index) => (
                        <div className="pro-items" key={index}>
                          <div className="image">
                            <img alt={product.name} src={product.img} />
                          </div>
                          <div className="items-contact">
                            <h4><a href="#">{product.name}</a></h4>
                            <span className="bb-pro-rating">
                              {[1, 2, 3, 4, 5].map((star, i) =>
                                <i key={i} className={i < product.rating ? "ri-star-fill" : "ri-star-line"}></i>
                              )}
                            </span>
                            <div className="inner-price">
                              <span className="new-price">{product.price}</span>
                              <span className="old-price">{product.oldPrice}</span>
                            </div>
                            <div className="bb-pro-variation">
                              <ul>
                                {["250g", "500g", "1kg"].map((size, i) => (
                                  <li key={i} className={i === 0 ? "active" : ""}>
                                    <a href="#" className="bb-opt-sz" data-tooltip={["Small", "Medium", "Large"][i]}>
                                      {size}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Delivery Method */}
                <div className="css-0" data-aos="fade-up"
                        data-aos-duration="500" data-aos-once="true"
                        data-aos-delay="600">
                  <div className="checkout-items">
                    <div className="checkout-method">
                      <div className="sub-title"><h4>Delivery Method</h4></div>
                      <span className="details">Please select the preferred shipping method to use on this order.</span>
                      <div className="bb-del-option">
                        <div className="inner-del">
                          <span className="bb-del-head">Free Shipping</span>
                          <div className="radio-itens">
                            <input id="rate1" type="radio" name="rate" value="free" defaultChecked />
                            <label htmlFor="rate1">Rate - $0.00</label>
                          </div>
                        </div>
                        <div className="inner-del mb-24">
                          <span className="bb-del-head">Flat Rate</span>
                          <div className="radio-itens">
                            <input id="rate2" type="radio" name="rate" value="flat" />
                            <label htmlFor="rate2">Rate - $5.00</label>
                          </div>
                        </div>
                      </div>
                      <div className="about-order">
                        <h5>Add Comments About Your Order</h5>
                        <textarea name="your-comment" placeholder="Comments" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="css-0" data-aos="fade-up"
                        data-aos-duration="500" data-aos-once="true"
                        data-aos-delay="600" >
                  <div className="checkout-items">
                    <div className="sub-title"><h4>Payment Method</h4></div>
                    <div className="checkout-method">
                      <span className="details">Please select the preferred shipping method to use on this order.</span>
                      <div className="bb-del-option">
                        <div className="inner-del">
                          <div className="radio-itens">
                            <input id="Cash1" type="radio" name="payment" />
                            <label htmlFor="Cash1">Cash On Delivery</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="about-order">
                      <h5>Add Comments About Your Order</h5>
                      <textarea name="your-comment" placeholder="Comments" />
                    </div>
                  </div>
                </div>

                {/* Payment Image */}
                <div className="css-0" data-aos="fade-up"
                        data-aos-duration="500" data-aos-once="true"
                        data-aos-delay="600">
                  <div className="checkout-items">
                    <div className="sub-title"><h4>Payment Method</h4></div>
                    <div className="payment-img">
                      <img alt="payment" src="/img/payment.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Form */}
            <div className="col-lg-8 col-sm-12 mb-24">
              <div className="css-zvi4ix" data-aos="fade-up"
                        data-aos-duration="500" data-aos-once="true"
                        data-aos-delay="600">
                <div className="bb-checkout-contact">

                  <div className="main-title"><h4>New Customer</h4></div>

                  <label className="inner-title">Checkout Options</label>
                  <div className="checkout-radio">
                    <div className="radio-itens">
                      <input id="guest" type="radio" name="account" value="guest" defaultChecked />
                      <label htmlFor="guest">Guest Account</label>
                    </div>
                    <div className="radio-itens">
                      <input id="register" type="radio" name="account" value="register" />
                      <label htmlFor="register">Register Account</label>
                    </div>
                    <div className="radio-itens">
                      <input id="login" type="radio" name="account" value="login" />
                      <label htmlFor="login">Login Account</label>
                    </div>
                  </div>

                  <div className="main-title"><h4>Billing Details</h4></div>
                  <div className="checkout-radio">
                    <div className="radio-itens">
                      <input id="address1" type="radio" name="address" value="use" disabled />
                      <label htmlFor="address1">I want to use an existing address</label>
                    </div>
                    <div className="radio-itens">
                      <input id="address2" type="radio" name="address" value="new" defaultChecked />
                      <label htmlFor="address2">I want to use new address</label>
                    </div>
                  </div>

                  <form method="post" className="input-box-form">
                    <div className="row">
                      {[
                        { label: "First Name *", name: "firstName", placeholder: "Enter your First Name" },
                        { label: "Last Name *", name: "lastName", placeholder: "Enter your Last Name" },
                        { label: "Address *", name: "address", placeholder: "Address Line 1", full: true },
                        { label: "Post Code *", name: "postCode", placeholder: "Post Code" },
                      ].map((field, i) => (
                        <div
                          key={i}
                          className={`${field.full ? "col-sm-12" : "col-lg-6 col-sm-12"}`}
                        >
                          <div className="input-item">
                            <label>{field.label}</label>
                            <div className="input-group">
                              <input
                                className="form-control"
                                type="text"
                                name={field.name}
                                placeholder={field.placeholder}
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Dropdowns */}
                      {[
                        { name: "country", label: "Country *", options: ["India", "Chile", "Egypt", "Italy", "Yemen"] },
                        { name: "state", label: "Region State *", options: ["Gujarat", "Goa", "Hariyana", "Mumbai", "Delhi"] },
                        { name: "city", label: "City *", options: ["Surat", "Bhavnagar", "Amreli", "Rajkot", "Amdavad"] },
                      ].map((select, i) => (
                        <div key={i} className="col-lg-6 col-sm-12">
                          <div className="input-item">
                            <label>{select.label}</label>
                            <div className="input-group">
                              <select className="custom-select form-select" name={select.name}>
                                <option value="" disabled>Choose {select.name}</option>
                                {select.options.map((opt, j) => (
                                  <option key={j} value={opt.toLowerCase()}>{opt}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="col-sm-12">
                        <div className="input-button">
                          <button type="submit" className="bb-btn-2">Add</button>
                        </div>
                      </div>

                    </div>
                  </form>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
