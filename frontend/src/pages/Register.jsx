import { useContext, useState } from "react";
import backgroundImg from "../assets/backgrounds/restaurant-background.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/authContext";

export default function Register() {
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);
  if (user) return <Navigate to="/" />;

  const [registerData, setRegisterData] = useState({
    fullname: "",
    registerDataname: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("asd");
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "content-type": "applicaftion/json",
        },
        body: JSON.stringify(registerData),
      });

      console.log(response);
      if (response.ok) {
        alert("Registration successful");
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.log(error.data);
    }
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
              name="registerDataname"
              onChange={handleChange}
              value={registerData.registerDataname}
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="your_registerDataname"
            />
            <label htmlFor="floatingInput">registerDataname</label>
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
            <button type="submit" role="button" className="btn w-50">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
