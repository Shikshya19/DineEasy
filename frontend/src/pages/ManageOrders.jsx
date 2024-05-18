import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/authContext";

export default function ManageOrders() {
  const { myAxios, user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const fetchOrders = () => {
    myAxios.get("/api/orders").then((res) => {
      setOrders(res.data);
      console.log(res.data);
    });
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
          <h1>Manage Orders</h1>
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
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{new Date(order.createdAt).toDateString()}</td>
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
