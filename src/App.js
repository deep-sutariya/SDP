import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Orders from './components/Orders';
import Home from './components/Home';
import RestaurantMenu from './components/RestaurantMenu';
import RestaurantHome from './components/RestaurantHome';
import Profile from './components/Profile';
import AllMenu from './components/AllMenu';
import RestaurantOrders from './components/RestaurantOrders';
import { TrayContexProvider } from './contex/tray_contex';
import { UserSelectedResContexProvider } from './contex/UserSelectedRestaurant';
import { LoginDetailsProvider } from './contex/Logincontex';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";

import { LoginDetails } from "./contex/Logincontex";
import { useContext } from "react";
import axios from 'axios';

function App() {


  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  let data,token,type,decodedToken;
  async function getData(type){
      data = await axios.post(`/${type}login`, {
      uemail: decodedToken.email,
      upass: decodedToken.pass,
    })
    console.log(data.data);
  }

  useEffect(()=>{
    token = getCookie("token");
    type = getCookie("type");
    decodedToken = jwt_decode(token);
    getData(type);

  },[])

  return (
    <>
    <UserSelectedResContexProvider>
    <TrayContexProvider>
    <LoginDetailsProvider>
        <BrowserRouter>
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path="orders" element={<Orders />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="restaurentmenu" element={<RestaurantMenu />} />
            <Route path="restaurenthome" element={<RestaurantHome />}>
              <Route path='' element={<Profile  />} />
              <Route path='menus' element={<AllMenu />} />
              <Route path='restaurantorders' element={<RestaurantOrders />} />
            </Route>
          </Routes>

        </BrowserRouter>
      </LoginDetailsProvider>
      </TrayContexProvider>
      </UserSelectedResContexProvider>

    </>
  );
}

export default App;
