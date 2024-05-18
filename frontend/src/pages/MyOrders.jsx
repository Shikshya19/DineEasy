import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/authContext";
import OrderItem from "../components/online-order/OrderItem";

export default function MyOrders() {
  const { myAxios } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMyOrders = () => {
    setLoading(true);
    myAxios
      .get("/api/orders/my-orders")
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getMyOrders();
  }, []);
  return (
    <div className="container py-3">
      <h2>My Orders</h2>
      {loading && <p className="text-center">Loading...</p>}

      {orders.length > 0 ? (
        orders.map((order) => {
          return (
            <div
              key={order._id}
              className="border p-3 my-3"
              style={{ backgroundColor: "#f0f2dd" }}
            >
              <h3 className="h5">Order ID: {order._id}</h3>
              <p>{new Date(order.createdAt).toDateString()}</p>
              <div className="my-3">
                {order.orderItems.map((item) => (
                  <OrderItem key={item._id} item={item} />
                ))}
              </div>
              <div className="d-flex justify-content-end gap-4">
                <p className="m-0">
                  Status:&nbsp;
                  {order.prepared ? (
                    order.delivered ? (
                      <span className="badge bg-success">Delivered</span>
                    ) : (
                      <span className="badge bg-primary">Prepared</span>
                    )
                  ) : (
                    <span className="badge bg-secondary">Preparing</span>
                  )}
                </p>
                <p className="m-0">
                  Payment:&nbsp;
                  {order.paid ? (
                    <span className="text-bg-success rounded-2 p-1">Paid</span>
                  ) : (
                    <span className="text-bg-danger rounded-2 p-1">
                      Not Paid
                    </span>
                  )}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center">No orders found</p>
      )}
    </div>
  );
}
