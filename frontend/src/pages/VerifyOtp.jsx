import { useContext, useState } from "react";
import { AuthContext } from "../store/authContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function VerifyOtp() {
  const { user, setToken } = useContext(AuthContext);
  const { email } = useParams();
  const [loading, setLoading] = useState(false);
  if (user) return <Navigate to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth/verify-otp", { email, otp: e.target.otp.value })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          setToken(res.data.token);
        }, 1000);
      })
      .catch((err) =>
        toast.error(err.response?.data.msg || "Something went wrong")
      )
      .finally(() => setLoading(false));
  };
  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-title">Verify Email</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="otp" className="form-label">
              OTP
            </label>
            <input
              type="number"
              id="otp"
              name="otp"
              className="form-input"
              placeholder="Enter OTP"
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
