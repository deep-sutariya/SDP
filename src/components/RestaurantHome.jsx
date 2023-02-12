import React, { useEffect } from "react";
import "../components/style/restauranthome.css";
import { Outlet } from "react-router-dom";

const RestaurantHome = ({setNavType}) => {

  useEffect(()=>{
    setNavType("restaurant")
  },[])

  return (
    <>
      <Outlet />
    </>
  );
  
};

export default RestaurantHome;