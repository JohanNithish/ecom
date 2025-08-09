import React, { useState } from 'react';
import Breadcrumb from '../comp/Breadcrum';
import Title from '../comp/Title';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    conformPassword: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form validation or API call here
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
                          name="conformPassword"
                          placeholder="Confirm your password"
                          required
                          className="form-control"
                          value={formData.conformPassword}
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
                          <option value="india">India</option>
                          <option value="chile">Chile</option>
                          <option value="egypt">Egypt</option>
                          <option value="italy">Italy</option>
                          <option value="yemen">Yemen</option>
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
                          <option value="gujarat">Gujarat</option>
                          <option value="goa">Goa</option>
                          <option value="hariyana">Hariyana</option>
                          <option value="mumbai">Mumbai</option>
                          <option value="delhi">Delhi</option>
                        </select>
                      </div>
                    </div>

                    <div className="bb-register-wrap bb-register-width-50">
                      <label>City*</label>
                      <div className="input-group">
                        <select
                          name="city"
                          required
                          className="custom-select form-select"
                          value={formData.city}
                          onChange={handleChange}
                        >
                          <option value="" disabled>City</option>
                          <option value="surat">Surat</option>
                          <option value="bhavnagar">Bhavnagar</option>
                          <option value="amreli">Amreli</option>
                          <option value="rajkot">Rajkot</option>
                          <option value="amdavad">Amdavad</option>
                        </select>
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
