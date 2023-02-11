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
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

import { LoginDetails } from "./contex/Logincontex";
import { useContext } from "react";
import axios from 'axios';
import Navbar from './components/Navbar';

function App() {

  


  const [navtype, setNavType] = useState("user");

  return (
    <>
      <UserSelectedResContexProvider>
        <TrayContexProvider>
          <LoginDetailsProvider>
            <BrowserRouter>
              <Routes>

                <Route path="/" element={<Navbar type={navtype}/>} >

                    <Route path="" element={<Home setNavType={setNavType}/>} />
                    <Route path="orders" element={<Orders setNavType={setNavType}/>} />
                    <Route path="login" element={<Login setNavType={setNavType}/>} />
                    <Route path="signup" element={<Signup setNavType={setNavType}/>} />
                    <Route path="restaurentmenu" element={<RestaurantMenu setNavType={setNavType}/>} />
                  <Route path="user" element={<RestaurantHome setNavType={setNavType}/>} >
                  </Route>
                  
                  <Route path="restaurenthome" element={<RestaurantHome setNavType={setNavType}/>}>
                    <Route path='' element={<Profile setNavType={setNavType}/>} />
                    <Route path='menus' element={<AllMenu setNavType={setNavType}/>} />
                    <Route path='restaurantorders' element={<RestaurantOrders setNavType={setNavType}/>} />
                  </Route>
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