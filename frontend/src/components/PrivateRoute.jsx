import { useContext } from "react";
import { AuthContext } from "../store/authContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ element }) {
  const { user } = useContext(AuthContext);
  if (user) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
}
