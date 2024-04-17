import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/authContext";
import MenuItem from "../components/online-order/MenuItem";
import OrderItem from "../components/online-order/OrderItem";

const OnlineOrder = () => {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const { myAxios } = useContext(AuthContext);

  const fetchMenu = () => {
    setLoading(true);
    myAxios
      .get("/api/menu")
      .then((response) => {
        setMenu(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const fetchOrder = () => {
    setLoading(true);
    myAxios
      .get("/api/orders/my-orders")
      .then((response) => setOrder(response.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleAdd = (item) => {
    setLoading(true);
    myAxios
      .post("/api/orders", { orderItem: item })
      .then((response) => fetchOrder())
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleRemove = (orderID) => {
    setLoading(true);
    myAxios
      .delete("/api/orders/" + orderID)
      .then((response) => fetchOrder())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchMenu();
    fetchOrder();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="online-order-container">
      <h1 className="online-order-title">Online Order</h1>
      <div className="online-order-content">
        <div className="online-order-menu">
          <h2 className="online-order-menu-title">Menu</h2>
          <div className="online-order-menu-items">
            {menu.map((item, index) => (
              <MenuItem key={index} item={item} handleAdd={handleAdd} />
            ))}
          </div>
        </div>
        <div className="online-order-order">
          <h2 className="online-order-order-title">Order</h2>
          <div className="online-order-order-items">
            {order.length > 0 ? (
              order.map((item, index) => (
                <OrderItem
                  key={index}
                  order={item}
                  handleAdd={handleAdd}
                  handleRemove={handleRemove}
                />
              ))
            ) : (
              <p className="online-order-order-empty">No items</p>
            )}
          </div>
          <div className="online-order-order-total">
            <p className="online-order-order-total-label">Total:</p>
            <p className="online-order-order-total-amount">
              Rs.{order.reduce((total, item) => total + item.total, 0)}
            </p>
          </div>
          <button className="online-order-order-button">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default OnlineOrder;
