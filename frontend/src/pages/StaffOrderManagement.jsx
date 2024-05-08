import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/authContext";
import constants from "../constants";

export default function StaffOrderManagement() {
  const { myAxios, user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const fetchOrders = () => {
    myAxios.get("/api/orders").then((res) => {
      setOrders(res.data);
    });
  };
  const updatePrepared = (orderId) => {
    myAxios.patch("/api/orders/mark-prepared/" + orderId).then((res) => {
      fetchOrders();
    });
  };
  const updateDelivered = (orderId) => {
    myAxios.patch("/api/orders/mark-delivered/" + orderId).then((res) => {
      fetchOrders();
    });
  };
  const markDelivered = (order) => {
    const confirm = window.confirm(
      `Do you want to mark (${order.orderItem.itemName} x${order.quantity}) as delivered?`
    );
    if (confirm) {
      updateDelivered(order._id);
    }
  };
  const markPrepared = (order) => {
    const confirm = window.confirm(
      `Do you want to mark (${order.orderItem.itemName} x${order.quantity}) as prepared?`
    );
    if (confirm) {
      updatePrepared(order._id);
    }
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
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.user.fullname}</td>
                    <td>{order.orderItem.itemName}</td>
                    <td>{order.quantity}</td>
                    <td>
                      {user.staffPost === constants.staff.posts.CHEF && (
                        <button
                          onClick={() => markPrepared(order)}
                          className="btn btn-primary"
                        >
                          Mark Prepared
                        </button>
                      )}
                      {user.staffPost === constants.staff.posts.WAITER && (
                        <button
                          onClick={() => markDelivered(order)}
                          className="btn btn-primary"
                        >
                          Mark Delivered
                        </button>
                      )}
                    </td>
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
