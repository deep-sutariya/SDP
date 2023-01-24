import React from "react";
import { useEffect,createContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/style/restauranthome.css";
import Profile from "./Profile";
const ResContext = createContext();
const RestaurantHome = () => {
  let data;
  const location = useLocation();
  useEffect(() => {
    data = location.state.data;
  }, []);

  console.log(data);

  return (
    <>
      <Navbar />
      {/* <div className="breadcrumb_container">
        <ul className="breadcrumb">
          <li>
            <Link to="profile">Profile</Link>
          </li>
          <li>
            <button onClick={menufunc}>Menu</button>
          </li>
          <li>
            <Link to="orders">Orders</Link>
          </li>
        </ul>
        <hr />
      </div> */}
        <Outlet />
    </>
  );
};

export default RestaurantHome;
// export { ResContext };
