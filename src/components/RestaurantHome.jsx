import React from "react";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/style/restauranthome.css";
const RestaurantHome = ({resData}) => {
  useEffect(()=>{
    const data = localStorage.getItem("data");
    console.log(JSON.parse(data));
  },[]);

  return (
    <>
      <Navbar />
      <div className="breadcrumb_container">
        <ul className="breadcrumb">
          <li>
            <Link to="">Profile</Link>
          </li>
          <li>
            <Link to="menus">Menu</Link>
          </li>
          <li>
            <Link to="orders">Orders</Link>
          </li>
        </ul>
        <hr />
      </div>
        <Outlet />
    </>
  );
};

export default RestaurantHome;
