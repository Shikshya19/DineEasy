import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">Admin Dashboard</h1>
      </header>

      <main className="admin-dashboard-content">
        <section className="admin-dashboard-section">
          <div className="admin-dashboard-item">
            <Link
              to="/admin/manage-tables"
              className="admin-dashboard-item-content"
            >
              <i className="fas fa-table admin-dashboard-item-icon"></i>
              <span className="admin-dashboard-item-label">Manage Tables</span>
            </Link>
          </div>
          <div className="admin-dashboard-item">
            <Link
              to="/admin/manage-staffs"
              className="admin-dashboard-item-content"
            >
              <i className="fas fa-user-tie admin-dashboard-item-icon"></i>
              <span className="admin-dashboard-item-label">Manage Staffs</span>
            </Link>
          </div>
          <div className="admin-dashboard-item">
            <Link
              to="/admin/manage-menu"
              className="admin-dashboard-item-content"
            >
              <i className="fas fa-utensils admin-dashboard-item-icon"></i>
              <span className="admin-dashboard-item-label">Manage Menu</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
