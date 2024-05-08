import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../store/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddStaff() {
  const { myAxios } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };
  const [addData, setAddData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    post: "",
  });
  const handleAdd = (e) => {
    e.preventDefault();
    setLoading(true);
    myAxios
      .post("/api/staffs", addData)
      .then((response) => {
        toast.success(response.data.message);
        navigate("/admin/manage-staffs");
      })
      .catch((error) => {
        toast.error(error.response?.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="row mb-3">
      {/* Add staff form */}
      <div className="col-md-4 m-auto mt-3">
        <form onSubmit={handleAdd}>
          <Form.Group className="my-3">
            <Form.Label htmlFor="fullname">Full Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              id="fullname"
              name="fullname"
              value={addData.fullname}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label htmlFor="username">Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              id="username"
              name="username"
              value={addData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label htmlFor="email">Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              id="email"
              name="email"
              value={addData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label htmlFor="phone">Phone:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone Number"
              id="phone"
              name="phone"
              value={addData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label htmlFor="password">Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              id="password"
              name="password"
              value={addData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label htmlFor="post">Post:</Form.Label>
            <Form.Control
              as="select"
              id="post"
              name="post"
              value={addData.post}
              onChange={handleChange}
              required
            >
              <option value="">Select Post</option>
              <option value="Waiter">Waiter</option>
              <option value="Chef">Chef</option>
              <option value="Cashier">Cashier</option>
            </Form.Control>
          </Form.Group>
          <button className="btn btn-primary" disabled={loading}>
            Add Staff
          </button>
        </form>
      </div>
    </div>
  );
}
