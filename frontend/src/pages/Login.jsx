import { useContext, useState } from "react";
import backgroundImg from "../assets/backgrounds/restaurant-background.jpg";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../store/authContext";
const URL = "http://localhost:8000/api/auth/login";

export default function Login() {
  const { login, user } = useContext(AuthContext);
  if (user?.role === "Admin") {
    return <Navigate to="/admin/dashboard" />;
  } else if (user) {
    return <Navigate to="/dashboard" />;
  }
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    login(loginData);
  };
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <img
        src={backgroundImg}
        alt="Restaurant"
        className="img-fluid position-absolute"
      />
      <div className="m-4 form-container py-2 px-3 rounded-3 position-relative">
        <h2 className="text-center my-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              name="email"
              onChange={handleChange}
              value={loginData.email}
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              name="password"
              onChange={handleChange}
              value={loginData.password}
              type="password"
              className="form-control"
              id="floatingInput"
              placeholder="your_password"
            />
            <label htmlFor="floatingInput">Password</label>
          </div>
          <div className="d-flex justify-content-center mb-2">
            <button type="submit" role="button" className="btn w-50">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
