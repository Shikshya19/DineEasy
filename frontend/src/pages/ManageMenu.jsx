import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../store/authContext";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";

export default function ManageMenu() {
  const { myAxios } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    myAxios
      .post("/api/menu", formData)
      .then((response) => {
        toast.success(response.data.message);
        fetchMenus();
      })
      .catch((error) => {
        toast.error(error.response?.data.message);
      })
      .finally(() => setLoading(false));
  };

  const fetchMenus = () => {
    setLoading(true);
    myAxios
      .get("/api/menu")
      .then((response) => {
        setMenus(response.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch menus");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Add Menu</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="itemName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item name"
                name="itemName"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter item description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <button className="btn btn-primary mt-2" disabled={loading}>
              {loading ? "Adding..." : "Add Menu"}
            </button>
          </Form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h2>Menus</h2>
          <ul>
            {menus.map((menu) => (
              <li key={menu._id}>{menu.itemName}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
