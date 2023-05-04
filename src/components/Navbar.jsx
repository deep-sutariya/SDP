import React from 'react'
import { Link, Outlet, useNavigate } from "react-router-dom";
import './style/Navbar.css';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { LoginDetails } from '../contex/Logincontex';
import axios from 'axios';
import { TrayContex } from '../contex/tray_contex';
import Cookies from 'js-cookie';
import Chatbox from './ChatBox';

function Navbar(props) {

  const navigate = useNavigate();

  const { setloginrestaurant, setloginuser, loginrestaurant, loginuser } = useContext(LoginDetails);

  const { setCartItem, cartItem } = useContext(TrayContex);
  const [first, setfirst] = useState({});


  var token, decodedToken;
  async function getData(type) {
    token = sessionStorage.getItem("token");
    decodedToken = jwt_decode(token);
    // console.log(decodedToken);
    // console.log(type);
    let data;
    if (type === "user") {
      data = await axios.post(`${process.env.REACT_APP_HOST_IP}/userlogin`, {
        uemail: decodedToken.email,
        upass: decodedToken.pass
      });
    } else {
      data = await axios.post(`${process.env.REACT_APP_HOST_IP}/restaurentlogin`, {
        uemail: decodedToken.email,
        upass: decodedToken.pass
      });
    }
    setfirst(data);
  }

  useEffect(() => {
    let type = sessionStorage.getItem("type");
    if (type) getData(type);
  }, []);


  useEffect(() => {
    if (sessionStorage.getItem("type") === "restaurent") {
      setloginrestaurant(first?.data?.data);
    } else {
      setloginuser(first?.data?.data);
    }
    console.log(first?.data?.data);
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
    Cookies.remove('selectedrestaurent')
    sessionStorage.clear();
    loginuser = null
    loginrestaurant = null
    navigate("/");
  }


  return (
    <>
      <nav className='navbar'>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>

        <label className="logo">BookMyMeal</label>


        <ul>
          {
            sessionStorage.getItem("type") == "restaurent" ?
              <>
                <li><Link className='navlinkss ${active}' to="restaurenthome" >Profile</Link></li>
                <li><Link className='navlinkss' to="restaurenthome/menus" >Menu</Link></li>
                <li><Link className='navlinkss' to="restaurenthome/restaurantorders" >Orders</Link></li>
                <li><Link className="navlinkss" to="../reservation" >Reservations</Link></li>

                {

                  (loginrestaurant) ?
                    <>
                      <div className="dropdown">
                        <button className="dropbtn" >{loginrestaurant?.rname}</button>
                        <div className="dropdown-content">
                          <Link to="/" onClick={finalCall}>Log Out</Link>
                        </div>
                      </div>
                    </>
                    :
                    <>
                      <li><Link className="navlinkss" to="../signup" >Signup</Link></li>
                      <li><Link className="navlinkss" to='../login'>Login</Link></li>
                    </>
                }
              </>

              :

              <>
                <li><Link className="navlinkss active" to="" >Home</Link></li>
                <li><Link className="navlinkss" to="../orders" >orders</Link></li>
                <li><Link className="navlinkss" to="../reservation" >Reservations</Link></li>
                {
                  (loginuser) ? <div className="dropdown">
                    <button className="dropbtn">{loginuser?.uname}</button>
                    <div className="dropdown-content">
                      <Link to="/" onClick={finalCall}>Log Out</Link>
                    </div>
                  </div>
                    :
                    <>
                      <li><Link className="navlinkss" to="../signup" >Signup</Link></li>
                      <li><Link className="navlinkss" to='../login'>Login</Link></li>
                    </>
                }

              </>
          }
        </ul>
      </nav>

      <Outlet />

      <Chatbox />

    </>
  )
}

export default Navbar