import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/authContext";
import constants from "../constants";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  if (user?.role === constants.user.roles.ADMIN) {
    return <Navigate to="/admin/dashboard" />;
  } else if (user?.role === constants.user.roles.STAFF) {
    return <Navigate to="/staff/dashboard" />;
  }

  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Restaurant Dashboard</h1>
      </header>

      <main className="dashboard-content">
        <section className="dashboard-section">
          <div className="dashboard-item">
            <div
              className="dashboard-item-content"
              onClick={() => navigate("/onlineOrder")}
            >
              <img
                src="..\src\assets\img\order.jpg"
                alt="Online Order"
                className="dashboard-item-image"
              />
              <span className="dashboard-item-label">Online Order</span>
            </div>
          </div>
          <div className="dashboard-item">
            <div
              className="dashboard-item-content"
              onClick={() => navigate("/tableReservation")}
            >
              <img
                src="..\src\assets\img\table.png"
                alt="Table Reservation"
                className="dashboard-item-image"
              />
              <span className="dashboard-item-label">Table Reservation</span>
            </div>
          </div>
          <div className="dashboard-item">
            <div
              className="dashboard-item-content"
              onClick={() => navigate("/eventmanagement")}
            >
              <img
                src="..\src\assets\img\events.png"
                alt="Event Management"
                className="dashboard-item-image"
              />
              <span className="dashboard-item-label">Event Management</span>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-item">
            <div
              className="dashboard-item-content"
              onClick={() => navigate("/customercare")}
            >
              <span className="dashboard-item-label">Customer Care</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
