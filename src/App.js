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
import { useState } from 'react';
import { TrayContexProvider } from './contex/tray_contex';
import { UserSelectedResContexProvider } from './contex/UserSelectedRestaurant';
import { LoginDetailsProvider } from './contex/Logincontex';
import Navbar from './components/Navbar';

function App() {
  const [first, setfirst] = useState({});
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
