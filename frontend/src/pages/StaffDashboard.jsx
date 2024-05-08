import React from "react";
import { Link } from "react-router-dom";

export default function StaffDashboard() {
  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">Staff Dashboard</h1>
      </header>

      <main className="admin-dashboard-content">
        <section className="admin-dashboard-section">
          <div className="admin-dashboard-item">
            <Link
              to="/staff/manage-orders"
              className="admin-dashboard-item-content"
            >
              <i className="fa-solid fa-bell-concierge admin-dashboard-item-icon"></i>
              <span className="admin-dashboard-item-label">Manage Orders</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
