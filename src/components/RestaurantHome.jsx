import React, { useEffect } from "react";
import "../components/style/restauranthome.css";
import { LoginDetails } from "../contex/Logincontex";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

import jwt_decode from "jwt-decode";
import axios from 'axios';
const RestaurantHome = ({setNavType}) => {

  setNavType("restaurant")


  return (
    <>
      <Outlet />  
    </>
  );
};

export default RestaurantHome;
