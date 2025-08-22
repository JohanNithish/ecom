import React, { useState } from 'react';
import Breadcrumb from '../comp/Breadcrum';
import { useNavigate } from "react-router-dom";
import Title from '../comp/Title';
import { toast } from 'react-toastify';
import api from '../api/useraxios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    address: '',
    country: '',
    state: '',
    city: '',
    postCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast.warning("Passwords do not match!");
    return;
  }

  try {
    const res = await api.post("/register", formData);
    console.log("Success:", res.data);
    toast.success("Registration successful!");
    navigate("/login");
  } catch (err) {
    toast.error(err.response?.data?.message || "Registration failed");
  }
};

  return (
    <>
    <Breadcrumb page="Register"/>
    <section className="section-register padding-tb-50" data-aos="fade-up"
                        data-aos-duration="500" data-aos-once="true"
                        data-aos-delay="500">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="bb-register css-zvi4ix" style={{ animationDelay: '200ms' }}>
              <div className="row">
                <div className="col-sm-12">
                  <Title main={"Register"} sub={"Best place to buy and sell digital products"} center={true}/>
                 
                </div>

                <div className="col-sm-12">
                  <form onSubmit={handleSubmit}>
                    <div className="bb-register-wrap bb-register-width-50">
                      <label>First Name*</label>
                      <div className="input-group">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="Enter your first name"
                          required
                          className="form-control"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="bb-register-wrap bb-register-width-50">
                      <label>Last Name*</label>
                      <div className="input-group">
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Enter your Last name"
                          required
                          className="form-control"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="bb-register-wrap bb-register-width-50">
                      <label>Email*</label>
                      <div className="input-group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your Email"
                          required
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="bb-register-wrap bb-register-width-50">
                      <label>Phone Number*</label>
                      <div className="input-group">
                        <input
                          type="text"
                          name="phoneNumber"
                          placeholder="Enter your phone number"
                          required
                          className="form-control"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="bb-register-wrap bb-register-width-50">
                      <label>Password*</label>
                      <div className="input-group">
                        <input
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          required
                          className="form-control"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="bb-register-wrap bb-register-width-50">
                      <label>Confirm Password*</label>
                      <div className="input-group">
                        <input
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm your password"
                          required
                          className="form-control"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="bb-register-wrap bb-register-width-100">
                      <label>Address*</label>
                      <div className="input-group">
                        <input
                          type="text"
                          name="address"
                          placeholder="Address Line 1"
                          required
                          className="form-control"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="bb-register-wrap bb-register-width-50">
                      <label>Country*</label>
                      <div className="input-group">
                        <select
                          name="country"
                          required
                          className="custom-select form-select"
                          value={formData.country}
                          onChange={handleChange}
                        >
                          <option value="" disabled>Country</option>
                          <option value="India">India</option>
                          <option value="Chile">Chile</option>
                          <option value="Egypt">Egypt</option>
                          <option value="Italy">Italy</option>
                          <option value="Yemen">Yemen</option>
                        </select>
                      </div>
                    </div>

                    <div className="bb-register-wrap bb-register-width-50">
                      <label>Region State*</label>
                      <div className="input-group">
                        <select
                          name="state"
                          required
                          className="custom-select form-select"
                          value={formData.state}
                          onChange={handleChange}
                        >
                          <option value="" disabled>State</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Hariyana">Hariyana</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          
                        </select>
                      </div>
                    </div>

                    <div className="bb-register-wrap bb-register-width-50">
                      <label>City*</label>
                      <div className="input-group">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          required
                          className="form-control"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="bb-register-wrap bb-register-width-50">
                      <label>Post Code*</label>
                      <div className="input-group">
                        <input
                          type="text"
                          name="postCode"
                          placeholder="Post Code"
                          required
                          className="form-control"
                          value={formData.postCode}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="bb-register-button">
                      <button type="submit" className="bb-btn-2">Register</button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Register;
