import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../store/authContext";
import { toast } from "react-toastify";

export default function ManageTables() {
  const [loading, setLoading] = useState(true);
  const [tables, setTables] = useState([]);
  const { myAxios } = useContext(AuthContext);
  const [addData, setAddData] = useState({
    name: "",
    seatCapacity: 0,
  });

  const handleAdd = (e) => {
    e.preventDefault();
    setLoading(true);
    myAxios
      .post("/api/table", addData)
      .then((response) => {
        toast.success(response.data.message);
        fetchTables();
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
  const fetchTables = () => {
    setLoading(true);
    myAxios
      .get("/api/table")
      .then((response) => {
        setTables(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };
  const handleDelete = (_id) => {
    const confirm = window.confirm("Are you sure want to delete?");
    if (confirm) {
      setLoading(true);
      myAxios
        .delete("/api/table/" + _id)
        .then((response) => {
          toast.success("Deleted successfully");
          fetchTables();
        })
        .catch(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);
  return (
    <div className="container">
      <div className="row mb-3">
        {/* Add table */}
        <div className="col-md-4 m-auto mt-3">
          <form onSubmit={handleAdd}>
            <Form.Group className="my-3">
              <Form.Label htmlFor="table-name" className="m-0">
                Table name:{" "}
              </Form.Label>
              <Form.Control
                className="my-2"
                type="text"
                placeholder="Table name"
                id="table-name"
                name="name"
                value={addData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label htmlFor="table-capacity" className="m-0">
                Seat capacity
              </Form.Label>
              <Form.Control
                className="my-2"
                type="number"
                placeholder="Seat capacity"
                id="table-capacity"
                name="seatCapacity"
                value={addData.seatCapacity}
                onChange={handleChange}
              />
            </Form.Group>
            <button className="btn btn-primary float-end" disabled={loading}>
              Add
            </button>
          </form>
        </div>
      </div>
      {/* <div className="row mb-3">
        <div className="tables col-md-6 m-auto text-center">
          {tables?.map((table, idx) => (
            <div key={idx}>
              {table.name}: {table.seatCapacity}
            </div>
          ))}
        </div>
      </div> */}

      <div className="row mb-3">
        <div className="col-md-8 m-auto">
          <h3 className="text-center">Tables List</h3>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Table name</th>
                <th scope="col">Seat capacity</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table) => (
                <tr key={table._id}>
                  <td>{table.name}</td>
                  <td>{table.seatCapacity}</td>
                  <td>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(table._id)}
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
