import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="container">
      <Link to="/admin/manage-tables" className="btn btn-primary">
        Manage Tables
      </Link>
      <div className="container">
        <Link to="/admin/manage-staffs" className="btn btn-primary">
          Manage Staffs
        </Link>
      </div>
      <div className="container">
        <Link to="/admin/manage-menu" className="btn btn-primary">
          Manage Menu
        </Link>
      </div>
    </div>
  );
}
