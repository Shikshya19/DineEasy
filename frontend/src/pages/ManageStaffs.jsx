import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../store/authContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function ManageStaffs() {
  const [loading, setLoading] = useState(true);
  const [staffs, setstaffs] = useState([]);
  const { myAxios } = useContext(AuthContext);
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
        fetchstaffs();
      })
      .catch((error) => {
        toast.error(error.response?.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  const fetchstaffs = () => {
    setLoading(true);

    myAxios
      .get("/api/staffs")
      .then((response) => {
        setstaffs(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchstaffs();
  }, []);

  return (
    <div className="container">
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
              Add Staffs
            </button>
          </form>
        </div>
      </div>
      <div className="row mb-3">
        {}
        <div className="col-md-6 m-auto text-center">
          <h3>Staffs List</h3>
          <ul>
            {staffs.map((staff) => (
              <li key={staff._id}>{staff.user.fullname}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
