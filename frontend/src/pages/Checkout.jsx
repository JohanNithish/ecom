import React, { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../comp/Breadcrum';
import CartSummary from '../comp/CartSummary';
import { ProductsContext } from '../comp/ProductsContext';
import api from '../api/useraxios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [discount, setDiscount] = useState(0);
  const { user, cart, setCart, products } = useContext(ProductsContext);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    postCode: '',
    country: '',
    state: '',
    city: '',
    payment_method: 'Online', // default
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [user, navigate, location]);

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
            phoneNumber: u.phoneNumber || '',
            address: u.address || '',
            postCode: u.postCode || '',
            country: u.country || '',
            state: u.state || '',
            city: u.city || '',
          }));
        }
      } catch (err) {
        console.error("Data fetch failed:", err);
      }
    };
    fetchUserForm();
  }, [user]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Load Razorpay SDK
  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ✅ Checkout Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setLoading(true);

    try {
      if (form.payment_method === "Cash on Delivery") {
        // COD → send order without payment_id
        await placeOrder(null);
      } else {
        // Online Payment → open Razorpay
        const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
          toast.error("Razorpay SDK failed to load");
          return;
        }

        // Example order amount (cart total)
        const calculateTotalAmount = () => {
          // Build cart items with product data
          const cartItems = cart
            .map((c) => {
              const product = products.find(
                (p) => p.id === c.productId || p._id === c.productId
              );
              return product ? { ...product, qty: c.quantity, weight: c.weight } : null;
            })
            .filter(Boolean);

          // 🔹 Calculate subtotal (match correct weight price)
          const subTotal = cartItems.reduce((acc, item) => {
            const selectedPrice = item.price.find(p => p.metric === item.weight);
            const offerPrice = selectedPrice ? selectedPrice.offerprice : 0;
            return acc + (offerPrice * item.qty);
          }, 0);

          const delivery = 22.2;
          const gst = subTotal * 0.05; // ✅ 5% GST
          return subTotal + delivery + gst - discount;
        };

        const totalAmount = calculateTotalAmount();

        const options = {
          key: import.meta.env.VITE_RAZORPAY, // <-- replace with your key
          amount: Math.round(totalAmount * 100), // Razorpay works in paise
          currency: "INR",
          name: "Green Cart",
          description: "Order Payment",
          handler: async function (response) {
            // ✅ Razorpay gives payment_id here
            await placeOrder(response.razorpay_payment_id);
          },
          prefill: {
            name: `${form.firstName} ${form.lastName}`,
            email: user?.email,
            contact: form.phoneNumber,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      toast.error("Checkout failed");
      setLoading(false);
    }
  };

  // ✅ Place Order API
  const placeOrder = async (payment_id) => {
    try {
      const payload = {
        userId: user.id,
        userDetails: {
          firstName: form.firstName,
          lastName: form.lastName,
          phoneNumber: form.phoneNumber,
          address: form.address,
          postCode: form.postCode,
          country: form.country,
          state: form.state,
          city: form.city,
        },
        payment_method: form.payment_method,
        payment_id, // <-- send payment id if online
      };

      const res = await api.post('/checkout', payload, { withCredentials: true });

      if (res.data?.success) {
        toast.success("Order placed successfully!");
        setCart([]);
        navigate("/orders");
      } else {
        toast.error(res.data?.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Order save failed:", err);
      toast.error("Order save failed");
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb page="Checkout" />

      <section className="section-checkout padding-tb-50">
        <div className="container">
          <div className="row mb-minus-24">
            <CartSummary isList={true} />

            <div className="col-lg-8 col-sm-12 mb-24">
              <div className="css-zvi4ix">
                <div className="bb-checkout-contact">
                  <div className="main-title"><h4>Billing Details</h4></div>

                  <form onSubmit={handleSubmit} className="input-box-form">
                    <div className="row">

                      {/* Inputs */}
                      {[
                        { label: "First Name *", name: "firstName", readonly: true },
                        { label: "Last Name *", name: "lastName", readonly: true },
                        { label: "Mobile *", name: "phoneNumber" },
                        { label: "Address *", name: "address" },
                        { label: "Post Code *", name: "postCode" },
                      ].map((f, i) => (
                        <div key={i} className="col-lg-6 col-sm-12">
                          <div className="input-item">
                            <label>{f.label}</label>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                name={f.name}
                                value={form[f.name] || ''}
                                onChange={handleChange}
                                readOnly={f.readonly || false}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Dropdowns */}
                      <div className="col-lg-6 col-sm-12">
                        <div className="input-item">
                          <label>Country *</label>
                          <select
                            className="custom-select form-select"
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Choose Country</option>
                            {["India", "Chile", "Egypt", "Italy", "Yemen"].map((c, i) =>
                              <option key={i} value={c}>{c}</option>
                            )}
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6 col-sm-12">
                        <div className="input-item">
                          <label>State *</label>
                          <select
                            className="custom-select form-select"
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Choose State</option>
                            {["Andhra Pradesh", "Delhi", "Goa", "Gujarat", "Hariyana", "Karnataka", "Kerala", "Mumbai", "Tamil Nadu"].map((s, i) =>
                              <option key={i} value={s}>{s}</option>
                            )}
                          </select>
                        </div>
                      </div>

                      {/* City */}
                      <div className="col-lg-6 col-sm-12">
                        <div className="input-item">
                          <label>City</label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Payment */}
                      <label className="inner-title">Payment Method</label>
                      <div className="checkout-radio">
                        <div className="radio-itens">
                          <input
                            id="pay-online"
                            type="radio"
                            name="payment_method"
                            value="Online"
                            checked={form.payment_method === "Online"}
                            onChange={handleChange}
                          />
                          <label htmlFor="pay-online">Online</label>
                        </div>
                        <div className="radio-itens">
                          <input
                            id="pay-cod"
                            type="radio"
                            name="payment_method"
                            value="Cash on Delivery"
                            checked={form.payment_method === "Cash on Delivery"}
                            onChange={handleChange}
                          />
                          <label htmlFor="pay-cod">Cash on Delivery</label>
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className="input-button">
                          <button
                            type="submit"
                            className="bb-btn-2 d-flex gap-3 align-items-center"
                            disabled={loading}

                          >
                            {loading ? (
                              <>
                                <CircularProgress size={20} color="inherit" />
                                Placing Order...
                              </>
                            ) : (
                              "Place Order"
                            )}
                          </button>
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
