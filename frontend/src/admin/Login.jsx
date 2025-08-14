import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Login() {
const apiUrl = import.meta.env.VITE_API_ADMIN;
const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = {
    username: form.username.value,
    password: form.password.value,
  };

  try {
      const res = await axios.post(`${apiUrl}/adminlogin`, formData);
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/home", { state: { message: res.data.message } });
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        toast.error(err.response.data.message, { autoClose: 3000 });
      } else if (err.response && err.response.status === 400) {
        toast.warn(err.response.data.message, { autoClose: 3000 });
      } else {
        toast.error("Server error. Please try again later.", { autoClose: 3000 });
      }
    }

};
  return (
    <>
    <div className="login-form">
   <form onSubmit={handleSubmit}>
    <h3>Admin Login</h3>
    <label htmlFor="user"> Username</label>
    <input type="text" name="username" id="user" placeholder="Enter Username" autoComplete="name" />
    <label htmlFor="psw">Password</label>
    <input type="password" name="password" id="password" placeholder="Enter Password" autoComplete="password" />
    <div className="my-30 text-center">
    <button type="submit" className="mt-1" >Login Now</button>
    <Link className="text-white text-decoration-none" to="forgetpassword"> Forget Password?</Link>
    </div>
  </form>
  </div>
  </>
  );
}
