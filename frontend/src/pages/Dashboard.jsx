import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/authContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  if (user?.role === "Admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  const navigate = useNavigate();

  return (
    <>
      <section id="dashboard" class="dashboard"></section>
      <h1 className="centerText">Dashboard</h1>
      <div className="container">
        <div className="row">
          <div className="col">
            {/* Use a callback function to call navigate */}
            <div
              className="btn btn-primary"
              onClick={() => navigate("/onlineOrder")}
            >
              Online Order
            </div>
          </div>
          <div className="col">
            <div
              className="btn btn-primary"
              onClick={() => navigate("/tableReservation")}
            >
              Table Reservation
            </div>
          </div>
          <div className="col">
            <div
              className="btn btn-primary"
              onClick={() => navigate("/eventmanagement")}
            >
              Eevent Mamangement
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input
              className="btn btn-primary"
              type="button"
              value="Customer Care"
            />
          </div>
        </div>
      </div>
    </>
  );
}
