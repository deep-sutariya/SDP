import React from 'react'
import { Link, Outlet } from "react-router-dom";
import './style/Navbar.css';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { LoginDetails } from '../contex/Logincontex';
import axios from 'axios';
import { TrayContex } from '../contex/tray_contex';
import Cookies from 'js-cookie';

function Navbar(props) {
  const { setloginrestaurant, setloginuser, loginrestaurant, loginuser } = useContext(LoginDetails);

  const { setCartItem, cartItem } = useContext(TrayContex);
  const [first, setfirst] = useState({});

  // Set Contex 
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  var token, decodedToken;
  async function getData(type) {
    token = getCookie("token");
    decodedToken = jwt_decode(token);
    console.log(decodedToken);
    console.log(type);
    setfirst(await axios.post(`/${type}login`, {
      uemail: decodedToken.email,
      upass: decodedToken.pass,
    }));
  }

  useEffect(() => {
    getData(getCookie("type"));
  }, []);


  useEffect(() => {
    if (getCookie("type") === "restaurent") {
      setloginrestaurant(first?.data?.data);
    } else {
      setloginuser(first?.data?.data);
    }
  }, [first])

  var links = document.querySelectorAll('.navlinkss');
  if (links.length > 0) {
    links.forEach((link) => {
      link.addEventListener('click', (e) => {

        links.forEach((link) => {
          link.classList.remove('active');
        });

        link.classList.add('active');
      });
    });
  }

  const finalCall = () => {
    Cookies.remove('token')
    Cookies.remove('type')
    Cookies.remove('selectedrestaurant')
    // cookie.remove("selectedrestaurant");
    localStorage.clear();
  }


  return (
    <>
      <nav className='navbar'>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>

        <label className="logo">BookMyMeal</label>

        {
          props.type === "user" ?

            <ul>
              <li><Link className="navlinkss active" to="" >Home</Link></li>
              <li><Link className="navlinkss" to="../orders" >orders</Link></li>
              <li><Link className="navlinkss" to="../signup" >Signup</Link></li>
              {
                loginuser ?
                  <>
                    <li>
                      <select name="username" id="username">
                        <option value="username"><li>{loginuser.uname}</li></option>
                        <option value="logoutbtn"><li><Link className='navlinkss' onSelect={finalCall} to="/" >LogOut</Link></li></option>
                      </select>
                    </li>
                  </>
                  :
                  <>
                    <li><Link className="navlinkss" to='../login'>Login</Link></li>
                  </>
              }
            </ul>
            :
            <ul>
              <li><Link className='navlinkss ${active}' to="restaurenthome" >Profile</Link></li>
              <li><Link className='navlinkss' to="restaurenthome/menus" >Menu</Link></li>
              <li><Link className='navlinkss' to="restaurenthome/restaurantorders" >Orders</Link></li>
              <li><Link className="navlinkss" to="../signup" >Signup</Link></li>
              {
                loginrestaurant ?
                  <>
                    <li>
                      <select name="username" id="username">
                        <option value="username"><li>{loginrestaurant.rname}</li></option>
                        <option value="logoutbtn" onSelect={console.log('fbuydsiuriu')}><li><Link className='navlinkss' onClick={finalCall} to="/" >LogOut</Link></li></option>
                      </select>
                    </li>
                  </>
                  :
                  <>
                    <li><Link className="navlinkss" to='../login'>Login</Link></li>
                  </>
              }
            </ul>
        }
      </nav>
      <Outlet />
    </>
  )
}

export default Navbar