import React, { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../comp/Breadcrum';
import CartSummary from '../comp/CartSummary';
import { ProductsContext } from '../comp/ProductsContext';
import api from '../api/useraxios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, cart, setCart } = useContext(ProductsContext);

   const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cart || cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      const payload = {
        userId: user.id,
        userDetails: {
          firstName: form.firstName,
          lastName: form.lastName,
          address: form.address,
          postCode: form.postCode,
          country: form.country,
          state: form.state,
          city: form.city
        },
        products: cart,
        payment_method: form.payment_method
      };

      const res = await api.post('/checkout', payload, { withCredentials: true });

      if (res.data?.success) {
        toast.success("Order placed successfully!");
        window.location.replace("/orders");
      } else {
        toast.error(res.data?.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      toast.error("Checkout failed");
    }
  };
  // Redirect if no cart or user
  useEffect(() => {
    if (!cart || cart.length === 0) {
      toast.warning("Add at least one Product");
      navigate('/product');
      return;
    }
    else if (!user) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [user, cart, navigate, location]);

  // Form state
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    postCode: '',
    country: '',
    state: '',
    city: '',
    payment_method: 'Online' // default
  });

  // Fetch user details
  useEffect(() => {
    const fetchUserForm = async () => {
      if (!user?.id) return;
      try {
        const resUser = await api.get(`/user/${user.id}`, { withCredentials: true });
        if (resUser.data?.success && resUser.data?.data) {
          const u = resUser.data.data;
          setForm(prev => ({
            ...prev,
            firstName: u.firstName || '',
            lastName: u.lastName || '',
            address: u.address || '',
            postCode: u.postCode || '',
            country: u.country || '',
            state: u.state || '',
            city: u.city || ''
          }));
        }
      } catch (err) {
        console.error("Data fetch failed:", err);
      }
    };
    fetchUserForm();
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };



  return (
    <>
      <Breadcrumb page="Checkout" />

      <section className="section-checkout padding-tb-50">
        <div className="container">
          <div className="row mb-minus-24">
            <CartSummary isList={true} />

            {/* Billing Form */}
            <div className="col-lg-8 col-sm-12 mb-24">
              <div className="css-zvi4ix" data-aos="fade-up" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">
                <div className="bb-checkout-contact">
                  <div className="main-title"><h4>Billing Details</h4></div>

                  <form onSubmit={handleSubmit} className="input-box-form">
                    <div className="row">
                      {/* Text Fields */}
                      {[
                        { label: "First Name *", name: "firstName", placeholder: "Enter your First Name" },
                        { label: "Last Name *", name: "lastName", placeholder: "Enter your Last Name" },
                        { label: "Address *", name: "address", placeholder: "Address Line 1", full: true },
                        { label: "Post Code *", name: "postCode", placeholder: "Post Code" },
                      ].map((field, i) => (
                        <div key={i} className={`${field.full ? "col-sm-12" : "col-lg-6 col-sm-12"}`}>
                          <div className="input-item">
                            <label>{field.label}</label>
                            <div className="input-group">
                              <input
                                className="form-control"
                                type="text"
                                value={form[field.name] || ''}
                                name={field.name}
                                placeholder={field.placeholder}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Dropdowns */}
                      {[
                        { name: "country", label: "Country *", options: ["India", "Chile", "Egypt", "Italy", "Yemen"] },
                        { name: "state", label: "Region State *", options: ["Andhra Pradesh", "Delhi", "Goa", "Gujarat", "Hariyana", "Karnataka", "Kerala", "Mumbai", "Tamil Nadu"] },
                      ].map((select, i) => (
                        <div key={i} className="col-lg-6 col-sm-12">
                          <div className="input-item">
                            <label>{select.label}</label>
                            <div className="input-group">
                              <select
                                className="custom-select form-select"
                                name={select.name}
                                value={form[select.name] || ''}
                                onChange={handleChange}
                                required
                              >
                                <option value="" disabled>Choose {select.name}</option>
                                {select.options.map((opt, j) => (
                                  <option key={j} value={opt}>{opt}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* City */}
                      <div className="col-lg-6 col-sm-12">
                        <div className="input-item">
                          <label>City</label>
                          <div className="input-group">
                            <input
                              className="form-control"
                              type="text"
                              name="city"
                              placeholder="City"
                              value={form.city || ''}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <label className="inner-title">Payment Method</label>
                      <div className="checkout-radio">
                        <div className="radio-itens">
                          <input
                            id="register"
                            type="radio"
                            name="payment_method"
                            value="Online"
                            checked={form.payment_method === "Online"}
                            onChange={handleChange}
                          />
                          <label htmlFor="register">Online</label>
                        </div>
                        <div className="radio-itens">
                          <input
                            id="guest"
                            type="radio"
                            name="payment_method"
                            value="Cash on Delivery"
                            checked={form.payment_method === "Cash on Delivery"}
                            onChange={handleChange}
                          />
                          <label htmlFor="guest">Cash on Delivery</label>
                        </div>
                      </div>

                      {/* Submit */}
                      <div className="col-sm-12">
                        <div className="input-button">
                          <button type="submit" className="bb-btn-2">Place Order</button>
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
