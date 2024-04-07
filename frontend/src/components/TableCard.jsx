export default function TableCard({ table }) {
  return (
    <div className="table-card col-md-3 m-2 p-3 ">
      <h3 className="h5 my-2">
        <i className="fa-solid fa-chair me-1"></i>
        {table.name}
      </h3>
      <p className="py-2 my-2">
        <i className="fa-solid fa-person me-1"></i>Capacity:{" "}
        {table.seatCapacity}
      </p>
      <div className="d-flex justify-content-between">
        <p className="mb-1">Status: {table.booked ? "Booked" : "Available"}</p>
        {!table.booked && (
          <div>
            <button className="btn btn-primary float-end">
              <i className="fa-solid fa-file-circle-plus me-1"></i>Book
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
