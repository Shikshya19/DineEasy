import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/authContext";
import MenuItem from "../components/online-order/MenuItem";

export default function OnlineOrder() {
  const [menu, setMenu] = useState([]);
  const { myAxios } = useContext(AuthContext);
  const fetchMenu = () => {
    // setLoading(true);
    myAxios
      .get("/api/menu")
      .then((response) => {
        setMenu(response.data);
      })
      .catch((error) => console.log(error));
    //   .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchMenu();
  }, []);
  return (
    <>
      <h1 className="centerText m-3 mb-4">Menu Info</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="p-2 px-3">
            <h2>Menu</h2>
            {menu.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </div>
        </div>
        <div className="col-md-9 bg-secondary"></div>
      </div>
    </>
  );
}
