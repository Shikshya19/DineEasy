import { useContext } from "react";
import { AuthContext } from "../store/authContext";
import constants from "../constants";

export default function TableCard({ table, handleBook, handleUnBook }) {
  const { user } = useContext(AuthContext);
  return (
    <div className="table-card col-md-3 m-2 p-3 ">
      <h3 className="h5 my-2">
        <i className="fa-solid fa-chair me-1"></i>
        {table.name}
      </h3>
      <p className="py-2 my-2">
        <i className="fa-solid fa-person me-1"></i>Capacity:{" "}
        {table.seatCapacity}
      </p>
      <p className="mb-1">Status: {table.booked ? "Booked" : "Available"}</p>
      <div className="d-flex justify-content-between">
        {(user.role === constants.user.roles.ADMIN ||
          user.role === constants.user.roles.STAFF) &&
          table.booked && (
            <p className="mb-1">
              Event type: {table.bookedFor ? table.bookedFor : "Regular"}
            </p>
          )}
        {table.booked
          ? (user.role === constants.user.roles.ADMIN ||
              user.role === constants.user.roles.STAFF) && (
              <div>
                <button
                  className="btn btn-secondary float-end"
                  onClick={() => handleUnBook(table._id)}
                >
                  <i className="fa-solid fa-file-circle-minus me-1"></i>Unbook
                </button>
              </div>
            )
          : user.role === constants.user.roles.CUSTOMER && (
              <div>
                <button
                  className="btn btn-primary float-end"
                  onClick={() => handleBook(table._id)}
                >
                  <i className="fa-solid fa-file-circle-plus me-1"></i>Book
                </button>
              </div>
            )}
      </div>
    </div>
  );
}
