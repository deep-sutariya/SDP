import React from 'react'
import { Link, Outlet ,useNavigate} from "react-router-dom";
import './style/Navbar.css';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { LoginDetails } from '../contex/Logincontex';
import axios from 'axios';
import { TrayContex } from '../contex/tray_contex';
import Cookies from 'js-cookie';

function Navbar(props) {

  const navigate = useNavigate();

  const { setloginrestaurant, setloginuser, loginrestaurant, loginuser } = useContext(LoginDetails);

  const { setCartItem, cartItem } = useContext(TrayContex);
  const [first, setfirst] = useState({});


  var token, decodedToken;
  async function getData(type) {
<<<<<<< HEAD
    token = getCookie("token");
    if(token){
      decodedToken = jwt_decode(token);
      setfirst(await axios.post(`/${type}login`, {
        uemail: decodedToken.email,
        upass: decodedToken.pass,
      }));
    }
=======
    token = sessionStorage.getItem("token");
    decodedToken = jwt_decode(token);
>>>>>>> e7d727e2f9c6204b3bb80ed0e2987b1cf792346d
    console.log(decodedToken);
    console.log(type);
  }

  useEffect(() => {
    getData(sessionStorage.getItem("type"));
  }, []);


  useEffect(() => {
    if (sessionStorage.getItem("type") === "restaurent") {
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
    console.log("adas");
    Cookies.remove('selectedrestaurent')
    sessionStorage.clear();
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

        {
          props.type === "user" ?

            <ul>
              <li><Link className="navlinkss active" to="" >Home</Link></li>
              <li><Link className="navlinkss" to="../orders" >orders</Link></li>
              <li><Link className="navlinkss" to="../signup" >Signup</Link></li>
              {
                sessionStorage.getItem("type") == "user"  ?
                  <>
                  <div className="dropdown">
                    <button className="dropbtn">{loginuser?.uname}</button>
                    <div className="dropdown-content">
                      <Link to="/" onClick={finalCall}>Log Out</Link>
                    </div>
                  </div>
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
                sessionStorage.getItem("type") == "restaurent"  ?
                  <>
                  <div className="dropdown">
                    <button className="dropbtn">{loginrestaurant?.rname}</button>
                    <div className="dropdown-content">
                      <Link to="/" onClick={finalCall}>Log Out</Link>
                    </div>
                  </div>
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