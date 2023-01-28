import React from "react";
import { useEffect } from "react";
import {  Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/style/restauranthome.css";
const RestaurantHome = ({resData}) => {
  useEffect(()=>{
    const data = localStorage.getItem("data");
    console.log(JSON.parse(data));
  },[]);

  return (
    <>
      <Navbar type="restaurant" />
      
        <Outlet />
    </>
  );
};

export default RestaurantHome;
