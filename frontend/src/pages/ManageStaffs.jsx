import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../store/authContext";
import { toast } from "react-toastify";
import axios from "axios";
import MyModal from "../components/MyModal";

export default function ManageStaffs() {
  const [loading, setLoading] = useState(true);
  const [staffs, setstaffs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { myAxios } = useContext(AuthContext);
  const [editData, setEditData] = useState({
    _id: "",
    fullname: "",
    username: "",
    email: "",
    phone: "",
    post: "",
  });

  const handleUpdate = (e) => {
    setLoading(true);
    myAxios
      .patch("/api/staffs/" + editData._id, editData)
      .then((response) => {
        toast.success("Updated successfully");
        setShowModal(false);
        fetchstaffs();
      })
      .finally(() => setLoading(false));
  };
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
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

  const handleDelete = (_id) => {
    const confirm = window.confirm("Are you sure want to delete?");
    if (confirm) {
      setLoading(true);
      myAxios
        .delete("/api/staffs/" + _id)
        .then((response) => {
          toast.success("Deleted successfully");
          fetchstaffs();
        })
        .catch(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchstaffs();
  }, []);

  return (
    <div className="container">
      <MyModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleUpdate}
        loading={loading}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="my-3">
            <Form.Label htmlFor="fullname">Full Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              id="fullname"
              name="fullname"
              value={editData.fullname}
              onChange={handleEditChange}
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
              value={editData.username}
              onChange={handleEditChange}
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
              value={editData.email}
              onChange={handleEditChange}
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
              value={editData.phone}
              onChange={handleEditChange}
              required
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label htmlFor="post">Post:</Form.Label>
            <Form.Control
              as="select"
              id="post"
              name="post"
              value={editData.post}
              onChange={handleEditChange}
              required
            >
              <option value="">Select Post</option>
              <option value="Waiter">Waiter</option>
              <option value="Chef">Chef</option>
              <option value="Cashier">Cashier</option>
            </Form.Control>
          </Form.Group>
        </form>
      </MyModal>

      <div className="row mb-3">
        <div className="col-md-8 m-auto">
          <h3 className="text-center">Staffs List</h3>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Full Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Post</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffs.map((staff) => (
                <tr key={staff._id}>
                  <td>{staff.user.fullname}</td>
                  <td>{staff.user.username}</td>
                  <td>{staff.user.email}</td>
                  <td>{staff.user.phone}</td>
                  <td>{staff.post}</td>
                  <td>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(staff._id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => {
                        setEditData({
                          _id: staff._id,
                          fullname: staff.user.fullname,
                          username: staff.user.username,
                          email: staff.user.email,
                          phone: staff.user.phone,
                          post: staff.post,
                        });
                        setShowModal(true);
                      }}
                      disabled={loading}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
