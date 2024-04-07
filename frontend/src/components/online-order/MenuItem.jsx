export default function MenuItem({ item }) {
  return (
    <div className="border m-2 rounded-2 p-2">
      <div className="d-flex align-items-center">
        <img
          src="https://png.pngtree.com/element_our/png/20180930/food-icon-design-vector-png_120564.jpg"
          alt={item.itemName}
          className="me-2 object-fit-cover"
          width="40px"
          height="40px"
        />
        <div className="w-100">
          <h2 className="m-0 h5">{item.itemName}</h2>
          <h3 className="m-0 h6">Rs.{item.price}</h3>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
