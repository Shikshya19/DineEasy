import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/authContext";
import { Modal, Button } from "react-bootstrap";
import MenuItem from "../components/online-order/MenuItem";
import OrderItem from "../components/online-order/OrderItem";
import axios from "axios";
import { toast } from "react-toastify";

const DialogBox = ({ handleClose }) => {
  return (
    <div className="App p-4">
      <Modal centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal Content.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Modal
          </Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const OnlineOrder = () => {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const { myAxios } = useContext(AuthContext);

  const [openDialog, setOpenDialog] = useState(false);
  const [orders, setOrders] = useState([]);

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
    const existingOrderIndex = orders.findIndex(
      (order) => order._id === item._id
    );

    if (existingOrderIndex !== -1) {
      // If the item already exists, increase its quantity
      const updatedOrders = [...orders];
      updatedOrders[existingOrderIndex].quantity += 1;
      setOrders(updatedOrders);
    } else {
      // If the item does not exist, add it with quantity 1
      const newOrder = { ...item, quantity: 1 };
      setOrders([...orders, newOrder]);
    }
    console.log(orders);
  };
  const handleRemove = (itemId) => {
    // Find the index of the item in the orders array
    const existingOrderIndex = orders.findIndex(
      (order) => order._id === itemId
    );

    if (existingOrderIndex !== -1) {
      // If the item exists in the orders array
      const updatedOrders = [...orders];
      // Decrease the quantity of the item
      updatedOrders[existingOrderIndex].quantity -= 1;
      // If quantity becomes 0, remove the item from the orders array
      if (updatedOrders[existingOrderIndex].quantity === 0) {
        updatedOrders.splice(existingOrderIndex, 1);
      }
      setOrders(updatedOrders);
    } else {
      // If the item does not exist, do nothing or handle error condition
      console.error("Item not found in orders array.");
    }
  };

  const handlePlaceOrder = () => {
    if (orders.length === 0)
      return alert("Order must have at least 1 item", "HI");
    const orderItems = orders.map((order) => {
      return { itemId: order._id, quantity: order.quantity };
    });

    setLoading(true);
    myAxios
      .post("/api/orders", { orderItems })
      .then((res) => {
        setOrders([]);
        window.location.href = res.data.payment_url;
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleCloseDialog = (e) => {
    setOpenDialog(false);
  };

  useEffect(() => {
    fetchMenu();
    fetchOrder();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {openDialog && <DialogBox handleClose={handleCloseDialog} />}
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
              {orders.length > 0 ? (
                orders.map((item, index) => (
                  <OrderItem
                    key={index}
                    item={item}
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
                Rs.
                {orders.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </p>
            </div>
            <button
              className="online-order-order-button"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlineOrder;
