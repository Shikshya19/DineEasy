import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import OnlineOrder from "./pages/OnlineOrder";
import AdminDashboard from "./pages/AdminDashboard";
import TableReservation from "./pages/TableReservation";
import TableInfo from "./pages/TableInfo";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import ManageTables from "./pages/ManageTables";
import ManageStaffs from "./pages/ManageStaffs";
import ManageMenu from "./pages/ManageMenu";
import EventManagement from "./pages/EventManagement";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          ></Route>
          <Route path="/aboutUs" element={<AboutUs />}></Route>
          <Route path="/onlineOrder" element={<OnlineOrder />}></Route>
          <Route path="/eventmanagement" element={<EventManagement />}></Route>
          <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
          <Route path="/admin/manage-tables" element={<ManageTables />}></Route>
          <Route path="/admin/manage-menu" element={<ManageMenu />}></Route>
          <Route
            path="/tablereservation"
            element={<TableReservation />}
          ></Route>
          <Route path="/tableinfo" element={<TableInfo />}></Route>
          <Route
            path="/admin/manage-staffs"
            element={<PrivateRoute element={<ManageStaffs />} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
