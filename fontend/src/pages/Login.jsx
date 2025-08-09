import Breadcrumb from '../comp/Breadcrum';
import { NavLink, useNavigate } from "react-router-dom";
import Title from '../comp/Title';
const Login = () => {
  return (
    <>
      <Breadcrumb page="Login" />

      <section className="section-login padding-tb-50">
        <div className="container">
          <div className="row">

            <div className="col-sm-12">
              <Title main={"Log"} special={"In"} sub={"Best place to buy and sell digital products"} center={true}/>
            </div>

            <div className="col-sm-12">
              <div className="bb-login-contact" data-aos="fade-up"
                        data-aos-duration="500" data-aos-once="true"
                        data-aos-delay="500">
                <form noValidate>
                  <div className="bb-login-wrap">
                    <label htmlFor="email">Email*</label>
                    <div className="input-group">
                      <input
                        placeholder="Enter Your Email"
                        required
                        id="email"
                        className="form-control"
                        type="email"
                        name="email"
                      />
                      <div className="invalid-feedback"></div>
                    </div>
                  </div>

                  <div className="bb-login-wrap">
                    <label htmlFor="password">Password*</label>
                    <div className="input-group">
                      <input
                        placeholder="Enter Your Password"
                        id="password"
                        className="form-control"
                        type="password"
                        name="password"
                      />
                      <div className="invalid-feedback"></div>
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
