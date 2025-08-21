import { useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import Breadcrumb from '../comp/Breadcrum';
import Title from '../comp/Title';
import api from "../api/useraxios";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: ""
  });

  const navigate = useNavigate();
  const location = useLocation();
const from = location.state?.from?.pathname || "/";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/userlogin",
        formData,
        { withCredentials: true } // send/receive cookies
      );

      toast.success("Login successful!");
      localStorage.setItem("accessToken", res.data.accessToken); // save token

      // --- Wishlist merge ---
      const localWishlist = JSON.parse(sessionStorage.getItem("wishlist")) || [];
      if (localWishlist.length > 0) {
        try {
          await api.post(
            "/wishlist/merge",
            { items: localWishlist },
            {
              headers: { Authorization: `Bearer ${res.data.accessToken}` },
              withCredentials: true,
            }
          );
          sessionStorage.removeItem("wishlist");
        } catch (wishlistErr) {
          console.error("Wishlist merge failed:", wishlistErr);
          toast.error("Could not sync your wishlist.");
        }
      }

      // --- Cart merge ---
      const localCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      if (localCart.length > 0) {
        try {
          await api.post(
            "/cart/merge",
            { items: localCart }, // [{ productId, weight, quantity }]
            {
              withCredentials: true,
            }
          );
          sessionStorage.removeItem("cart");
        } catch (cartErr) {
          console.error("Cart merge failed:", cartErr);
          toast.error("Could not sync your cart.");
        }
      }

      // ✅ Redirect
      window.location.replace(from);
    } catch (err) {
      console.error(err);
      if (err.response) {
        toast.error(err.response.data.message || "Login failed");
      } else {
        toast.error("Network error, please try again.");
      }
    }
  };

  return (
    <>
      <Breadcrumb page="Login" />
      <section className="section-login padding-tb-50">
        <div className="container">
          <div className="row">

            <div className="col-sm-12">
              <Title 
                main={"Log"} 
                special={"In"} 
                sub={"Best place to buy and sell digital products"} 
                center={true}
              />
            </div>

            <div className="col-sm-12">
              <div className="bb-login-contact">
                <form onSubmit={handleSubmit}>
                  <div className="bb-login-wrap">
                    <label>Email or Mobile*</label>
                    <div className="input-group">
                      <input
                        placeholder="Enter Your Email or Mobile"
                        required
                        className="form-control"
                        type="text"
                        name="emailOrMobile"
                        value={formData.emailOrMobile}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="bb-login-wrap">
                    <label>Password*</label>
                    <div className="input-group">
                      <input
                        placeholder="Enter Your Password"
                        className="form-control"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="bb-login-wrap">
                    <a href="#">Forgot Password?</a>
                  </div>

                  <div className="bb-login-button">
                    <button className="bb-btn-2" type="submit">Login</button>
                    <NavLink to="/register">Register</NavLink>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
