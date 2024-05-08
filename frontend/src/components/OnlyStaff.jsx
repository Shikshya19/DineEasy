import { useContext } from "react";
import { AuthContext } from "../store/authContext";
import { Navigate } from "react-router-dom";
import constants from "../constants.js";

export default function OnlyStaff({ element }) {
  const { user } = useContext(AuthContext);
  if (user?.role === constants.user.roles.STAFF) {
    return element;
  } else {
    return <Navigate to="/" />;
  }
}
