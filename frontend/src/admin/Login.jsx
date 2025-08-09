import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Login() {

const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = {
    username: form.username.value,
    password: form.password.value,
  };

  try {
    const res = await axios.post("http://localhost:5000/api/login", formData);

    alert(res.data.message);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/", { state: { message: res.data.message } });

  } catch (err) {
    console.error(err);
    if (err.response && err.response.status === 401) {
      alert("Wrong username or password!");
    } else if (err.response && err.response.status === 400) {
      alert("Username and password are required!");
    } else {
      alert("Server error. Please try again later.");
    }
  }
};

const element = <h1>Hello, world!</h1>;

  return (
    <>
    <div className="login-form">
   <form onSubmit={handleSubmit}>
    <h3>Login Form</h3>
    <label htmlFor="user"> Username</label>
    <input type="text" name="username" id="user" placeholder="Enter Username" autocomplete="name" />
    <label htmlFor="psw">Password</label>
    <input type="password" name="password" id="password" placeholder="Enter Password" autocomplete="password" />
    <button type="submit" >Login Now</button>
    <div className="social">
      <div className="gg"><i class="bi bi-google"></i> Google</div>
      <div className="fb"><i class="bi bi-facebook"></i> Facebook</div>
    </div>
  </form>
  </div>
  </>
  );
}
