import { useContext, useState } from "react";
import backgroundImg from "../assets/backgrounds/restaurant-background.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/authContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  if (user) return <Navigate to="/" />;

  const [registerData, setRegisterData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth/register", registerData)
      .then((res) => {
        toast.success(res.data.message);
        console.log(`/verify-otp/${registerData.email}`);
        navigate(`/verify-otp/${registerData.email}`);
      })
      .catch((err) =>
        toast.error(err.response?.data.msg || "Something went wrong")
      )
      .finally(() => setLoading(false));
  };
  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <img
        src={backgroundImg}
        alt="Restaurant"
        className="img-fluid position-absolute"
      />
      <div className="m-4 form-container py-2 px-3 rounded-3 position-relative">
        <h2 className="text-center my-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              name="fullname"
              onChange={handleChange}
              value={registerData.fullname}
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Full Name"
            />
            <label htmlFor="floatingInput">Full Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              name="username"
              onChange={handleChange}
              value={registerData.username}
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="your_username"
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              name="email"
              onChange={handleChange}
              value={registerData.email}
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              name="phone"
              onChange={handleChange}
              value={registerData.phone}
              type="tel"
              className="form-control"
              id="floatingInput"
              placeholder="98xxxxxxxx"
            />
            <label htmlFor="floatingInput">Phone</label>
          </div>
          <div className="form-floating mb-3">
            <input
              name="password"
              onChange={handleChange}
              value={registerData.password}
              type="password"
              className="form-control"
              id="floatingInput"
              placeholder="your_password"
            />
            <label htmlFor="floatingInput">Password</label>
          </div>
          <div className="d-flex justify-content-center mb-2">
            <button
              type="submit"
              role="button"
              className="btn w-50"
              disabled={loading}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
