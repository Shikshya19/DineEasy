import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/authContext";

export default function ManageOrders() {
  const { myAxios } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const fetchOrders = () => {
    myAxios.get("/api/orders").then((res) => {
      setOrders(res.data);
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Manage Orders</h1>
          {orders.length === 0 ? (
            <p className="text-center">No orders found.</p>
          ) : (
            <table className="table table-striped border">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Customer</th>
                  <th scope="col">Item</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.user.fullname}</td>
                    <td>{order.orderItem.itemName}</td>
                    <td>{order.quantity}</td>
                    <td>Rs.{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
