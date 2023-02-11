import React, { useEffect } from "react";
import "../components/style/restauranthome.css";
import { LoginDetails } from "../contex/Logincontex";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

const RestaurantHome = ({setNavType}) => {

  setNavType("restaurant");

  const {loginrestaurant} = useContext(LoginDetails);

  // const getData = async () => {
  //   const data = await axios.post("/getrestaurent",{
  //     id: localStorage.getItem("restaurantId")
  //   })
  //   setloginrestaurant(data.data);
  // }
  
  // useEffect(()=>{
  //   console.log("Refresh")
  // },[]);

  return (
    <>
      <Outlet />  
    </>
  );
};

export default RestaurantHome;
