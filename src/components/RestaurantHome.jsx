import React from "react";
import { useEffect,createContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/style/restauranthome.css";
import Profile from "./Profile";
const Res = createContext();
const RestaurantHome = ({resData}) => {

  const location = useLocation();
  useEffect(()=>{
    const data = localStorage.getItem("data");
    console.log(JSON.parse(data));
  },[]);

  return (
    <>
      <Navbar />
      <Res.Provider value="DEEP">
        <Profile />
      </Res.Provider>
      <div className="breadcrumb_container">
        <ul className="breadcrumb">
          <li>
            <Link to="profile">Profile</Link>
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
