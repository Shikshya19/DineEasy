import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import OnlineOrder from "./pages/OnlineOrder";
import AdminDashboard from "./pages/AdminDashboard";
import TableReservation from "./pages/TableReservation";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import OnlyStaff from "./components/OnlyStaff";
import OnlyCustomer from "./components/OnlyCustomer";
import Navbar from "./components/Navbar";
import ManageTables from "./pages/ManageTables";
import ManageStaffs from "./pages/ManageStaffs";
import ManageMenu from "./pages/ManageMenu";
import EventManagement from "./pages/EventManagement";
import ManageOrders from "./pages/ManageOrders";
import AddStaff from "./pages/AddStaff";
import StaffDashboard from "./pages/StaffDashboard";
import StaffOrderManagement from "./pages/StaffOrderManagement";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/aboutUs" element={<AboutUs />}></Route>

          {/* Logged in routes */}
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          ></Route>

          {/* Customer only routes */}
          <Route
            path="/onlineOrder"
            element={<OnlyCustomer element={<OnlineOrder />} />}
          ></Route>
          <Route
            path="/eventmanagement"
            element={<OnlyCustomer element={<EventManagement />} />}
          ></Route>
          <Route
            path="/tablereservation"
            element={<OnlyCustomer element={<TableReservation />} />}
          ></Route>

          {/* Staff routes */}
          <Route
            path="/staff/dashboard"
            element={<OnlyStaff element={<StaffDashboard />} />}
          ></Route>
          <Route
            path="/staff/manage-orders"
            element={<OnlyStaff element={<StaffOrderManagement />} />}
          ></Route>

          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={<AdminRoute element={<AdminDashboard />} />}
          ></Route>
          <Route
            path="/admin/manage-tables"
            element={<AdminRoute element={<ManageTables />} />}
          ></Route>
          <Route
            path="/admin/manage-orders"
            element={<AdminRoute element={<ManageOrders />} />}
          ></Route>
          <Route
            path="/admin/manage-menu"
            element={<AdminRoute element={<ManageMenu />} />}
          ></Route>
          <Route
            path="/admin/manage-staffs"
            element={<AdminRoute element={<ManageStaffs />} />}
          ></Route>
          <Route
            path="/admin/add-staff"
            element={<AdminRoute element={<AddStaff />} />}
          ></Route>
          <Route
            path="/admin/tablereservation"
            element={<AdminRoute element={<TableReservation />} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
