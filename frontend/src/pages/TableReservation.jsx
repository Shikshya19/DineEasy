import { useContext, useEffect, useState } from "react";
import TableCard from "../components/TableCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/authContext";

export default function TableReservation() {
  const [tables, setTables] = useState(null);
  const navigate = useNavigate();
  const { myAxios } = useContext(AuthContext);
  const fetchTables = () => {
    // setLoading(true);
    myAxios
      .get("/api/table")
      .then((response) => {
        setTables(response.data);
      })
      .catch((error) => console.log(error));
    //   .finally(() => setLoading(false));
  };
  const handleBook = (tableId) => {
    myAxios.post("/api/booking/", { tableId }).finally(() => {
      fetchTables();
      navigate("/onlineOrder");
    });
  };
  useEffect(() => {
    fetchTables();
  }, []);
  return (
    <>
      <h1 className="centerText">Table Reservation</h1>
      <div className="row d-flex justify-content-center">
        {tables?.map((table, idx) => (
          <TableCard table={table} key={idx} handleBook={handleBook} />
        ))}
      </div>
    </>
  );
}
