import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'animate.css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperProduct from '../comp/SwiperProduct'
import Title from '../comp/Title';
import Breadcrumb from '../comp/Breadcrum';

function Cart() {
const initialCart = [
  { id: 1, name: "Black Pepper Spice pack", price: 32, image: "/src/img/new-product/5.jpg", qty: 1 },
  { id: 2, name: "Small Cardamom Spice Pack", price: 41, image: "/src/img/new-product/6.jpg", qty: 1 },
  { id: 3, name: "Chilli Flakes Pack", price: 29, image: "/src/img/new-product/7.jpg", qty: 1 },
  { id: 4, name: "Tomato Ketchup Pack", price: 9, image: "/src/img/new-product/8.jpg", qty: 1 },
];

  const [cart, setCart] = useState(initialCart);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleQty = (id, delta) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.toLowerCase() === "save10") {
      setDiscount(10);
    } else {
      setDiscount(0);
      alert("Invalid coupon code.");
    }
  };

  const subTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const delivery = 22.2;
  const total = subTotal + delivery - discount;
const deals = [
    {
      img: '/src/img/product/3.jpg',
      hoverImg: '/src/img/product/back-3.jpg',
      tag: '',
      category: 'Juice',
      title: 'Mixed Almond nuts juice Pack',
      newPrice: '$39',
      oldPrice: '$32.00',
      quantity: '250 g',
    },
    {
      img: '/src/img/product/4.jpg',
      hoverImg: '/src/img/product/back-4.jpg',
      tag: 'Sale',
      category: 'Fruits',
      title: 'Fresh Mango Slice Juice',
      newPrice: '$25',
      note: 'Out Of Stock',
      quantity: '100 ml',
    },
    {
      img: '/src/img/new-product/5.jpg',
      hoverImg: '/src/img/new-product/back-5.jpg',
      tag: '',
      category: 'Spices',
      title: 'Black Pepper Spice pack',
      newPrice: '$22',
      oldPrice: '$32.00',
      quantity: '1 pack',
    },
    {
      img: '/src/img/product/1.jpg',
      hoverImg: '/src/img/product/back-1.jpg',
      tag: 'New',
      category: 'Chocos',
      title: 'Mixed Fruits Chocolates',
      newPrice: '$20',
      oldPrice: '$30.00',
      quantity: '1 Pack',
    },
    {
      img: '/src/img/product/2.jpg',
      hoverImg: '/src/img/product/back-2.jpg',
      tag: 'Hot',
      category: 'Juice',
      title: 'Organic Apple Juice Pack',
      newPrice: '$15',
      note: '3 Left',
      quantity: '100 ml',
    },
  ];
  return (
    <>
    <Breadcrumb page={"Cart"}/>
    <section className="section-cart padding-tb-50">
      <div className="container">
        <div className="row">
          {/* Summary Section */}
          <div className="col-lg-4 mb-4">
            <div className="bb-cart-sidebar-block">
              <div className="bb-sb-title"><h3>Summary</h3></div>
              <div className="bb-sb-blok-contact">
                <form>
                  <div className="input-box">
                    <label>Country *</label>
                    <select className="custom-select width-100">
                      <option disabled>Country</option>
                      <option value="india">India</option>
                      <option value="chile">Chile</option>
                      <option value="egypt">Egypt</option>
                      <option value="italy">Italy</option>
                      <option value="yemen">Yemen</option>
                    </select>
                  </div>
                  <div className="input-box">
                    <label>State/Province *</label>
                    <select className="custom-select width-100">
                      <option disabled>Please Select a region</option>
                      <option value="gujarat">Gujarat</option>
                      <option value="goa">Goa</option>
                      <option value="hariyana">Hariyana</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="delhi">Delhi</option>
                    </select>
                  </div>
                  <div className="input-box">
                    <label htmlFor="zip">Zip/Postal Code *</label>
                    <input id="zip" type="text" placeholder="Zip/Postal Code" />
                  </div>
                </form>

                <div className="bb-cart-summary">
                  <div className="inner-summary">
                    <ul>
                      <li><span className="text-left">Sub-Total</span><span className="text-right">${subTotal.toFixed(2)}</span></li>
                      <li><span className="text-left">Delivery Charges</span><span className="text-right">${delivery}</span></li>
                      <li>
                        <span className="text-left">Coupon Discount</span>
                        <span className="text-right">
                          <a className="bb-coupon drop-coupon">Apply Coupon</a>
                        </span>
                      </li>
                      <li>
                        <div className="coupon-down-box">
                          <form onSubmit={handleApplyCoupon}>
                            <input
                              className="bb-coupon"
                              placeholder="Coupon Code"
                              value={coupon}
                              onChange={(e) => setCoupon(e.target.value)}
                            />
                            <button type="submit" className="bb-btn-2 rtl-btn">Apply</button>
                          </form>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="summary-total">
                    <ul>
                      <li><span className="text-left">Total Amount</span><span className="text-right">${total.toFixed(2)}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Table */}
          <div className="col-lg-8 mb-4">
            <div className="bb-cart-table">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart && cart.length > 0 ? cart.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="Product-cart">
                          <img src={item.image} alt={item.name} />
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <div className="qty-plus-minus">
                          <div className="bb-qtybtn" onClick={() => handleQty(item.id, -1)}>-</div>
                          <input readOnly className="qty-input" value={item.qty} />
                          <div className="bb-qtybtn" onClick={() => handleQty(item.id, 1)}>+</div>
                        </div>
                      </td>
                      <td>${(item.qty * item.price).toFixed(2)}</td>
                      <td>
                        <div className="pro-remove">
                          <a onClick={() => removeItem(item.id)}>
                            <i className="ri-delete-bin-line"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  )) : <tr><td colSpan="6" className="text-center">Your cart items is empty</td></tr>}
                </tbody>
              </table>
            </div>
            <div>
              <a className="bb-btn-2 check-btn" href="/checkout/">Check Out</a>
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
                
                <Title main={"New "} special={"Arrivals"} sub={"Browse The Collection of Top Products."} center={true}/>
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
                {deals.map((item, index) => (
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
  )
}

export default Cart