import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../store/authContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="nav-brand h3 text-decoration-none">
          DineEasy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            {user?.role === "Customer" && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/my-orders"
                >
                  My Orders
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/AboutUs">
                About Us
              </NavLink>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to={
                      user.role === "Admin" ? "/admin/dashboard" : "/dashboard"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={logout}>
                    Logout
                  </button>
                </li>
                <li className="nav-item bg-success">
                  <NavLink to="edit-profile" className="nav-link">
                    {user.fullname}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
