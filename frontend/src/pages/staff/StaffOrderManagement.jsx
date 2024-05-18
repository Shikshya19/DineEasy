import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/authContext";
import constants from "../../constants";

export default function StaffOrderManagement() {
  const { myAxios, user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

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
      `Do you want to mark ${order.user.fullname} as delivered?`
    );
    if (confirm) {
      updateDelivered(order._id);
    }
  };
  const markPrepared = (order) => {
    const confirm = window.confirm(
      `Do you want to mark ${order.user.fullname}'s order as prepared?`
    );
    if (confirm) {
      updatePrepared(order._id);
    }
  };
  const handleSearch = (e) => {
    const customerName = e.target.value;
    const filtered = orders.filter((order) =>
      order.user.fullname.toLowerCase().includes(customerName.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mb-5">Manage Orders</h1>
          <div className="d-flex justify-content-center align-items-center my-3">
            <i className="me-2 fa-solid fa-magnifying-glass"></i>
            <input
              type="search"
              onChange={handleSearch}
              placeholder="Search Customer"
              className="p-1"
            />
          </div>
          {filteredOrders.length === 0 ? (
            <p className="text-center">No orders found.</p>
          ) : (
            <table className="table table-striped border">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Items</th>
                  <th scope="col">Total</th>
                  {user.staffPost !== constants.staff.posts.CASHIER ? (
                    <th scope="col">Actions</th>
                  ) : (
                    <th scope="col">Payment status</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.user.fullname}</td>
                    <td>
                      {order.orderItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-light p-2 d-inline mx-1 border"
                        >
                          {item.quantity}&nbsp;
                          {item.itemName}
                        </div>
                      ))}
                    </td>
                    <td>
                      Rs.&nbsp;
                      {order.orderItems.reduce(
                        (acc, item) => (acc += item.price * item.quantity),
                        0
                      )}
                    </td>
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
                      {user.staffPost === constants.staff.posts.CASHIER && (
                        <td>
                          {order.paid ? (
                            <span className="badge bg-success">Paid</span>
                          ) : (
                            <span className="badge bg-danger">Not Paid</span>
                          )}
                        </td>
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
