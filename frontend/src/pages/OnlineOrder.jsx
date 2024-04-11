import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/authContext";
import MenuItem from "../components/online-order/MenuItem";
import OrderItem from "../components/online-order/OrderItem";

export default function OnlineOrder() {
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
    <>
      <h1 className="centerText m-3 mb-4">Menu Info</h1>
      <div className="row">
        <div className="col-md-3">
          {/* Menu */}
          <div className="p-2 px-3">
            <h2>Menu</h2>
            {menu.map((item, index) => (
              <MenuItem key={index} item={item} handleAdd={handleAdd} />
            ))}
          </div>
        </div>
        <div
          className="col-md-9"
          style={{ backgroundColor: "rgb(229 229 229)" }}
        >
          {/* Order */}
          <div className="p-2 px-3">
            <h2 className="text-center">Order</h2>
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
              <p className="text-center">No items</p>
            )}
            <div
              className="border m-2 rounded-2 p-2"
              style={{ backgroundColor: "rgb(255 255 255 / 58%)" }}
            >
              <p className="m-0 text-end h5">
                Total: {order.reduce((total, item) => total + item.total, 0)}
              </p>
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary me-2 mt-3">Place order</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
