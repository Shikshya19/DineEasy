export default function OrderItem({ item, handleAdd, handleRemove }) {
  return (
    <div
      className="border m-2 rounded-2 p-2"
      style={{ backgroundColor: "rgb(255 255 255 / 58%)" }}
    >
      <div className="d-flex align-items-center">
        <img
          src="https://png.pngtree.com/element_our/png/20180930/food-icon-design-vector-png_120564.jpg"
          alt={item?.itemName}
          className="me-2 object-fit-cover"
          width="40px"
          height="40px"
        />
        <div className="w-100">
          <h2 className="m-0 h5">{item?.itemName}</h2>
          <h3 className="m-0 h6">Rs.{item?.price}</h3>

          <div className="d-flex justify-content-end align-items-center">
            x{item?.quantity}
            {handleAdd && handleRemove && (
              <>
                <button
                  className="btn m-2 bg-secondary text-light"
                  onClick={() => handleRemove(item?._id)}
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <button
                  className="btn m-2 bg-secondary text-light"
                  onClick={() => handleAdd(item)}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </>
            )}
          </div>
          <div className="d-flex justify-content-end align-items-center me-2 border border-end-0 border-start-0">
            <p className="h5">
              <span className="h6">Subtotal: </span>Rs.{" "}
              {item?.price * item?.quantity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
