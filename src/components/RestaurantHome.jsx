import React from "react";
import { useEffect } from "react";
import {  Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/style/restauranthome.css";
import { LoginDetails } from "../contex/Logincontex";
import { useContext } from "react";
import axios from "axios";
const RestaurantHome = ({props}) => {

  const {setloginrestaurant} = useContext(LoginDetails);
  const getData = async () => {
    const data = await axios.post("/getrestaurent",{
      id: localStorage.getItem("restaurantId")
    })
    setloginrestaurant(data.data);
  }
  useEffect(()=>{
    getData();
  },[]);

  return (
    <>
      <Navbar type="restaurant" />
      
        <Outlet />
    </>
  );
};

export default RestaurantHome;
