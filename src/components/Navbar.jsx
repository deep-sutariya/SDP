import React from 'react'
import { Link, Outlet } from "react-router-dom";
import './style/Navbar.css';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { LoginDetails } from '../contex/Logincontex';
import axios from 'axios';

function Navbar(props) {

  const {setloginrestaurant,setloginuser,loginrestaurant, loginuser} = useContext(LoginDetails);
  const [first, setfirst] = useState({});
  // Set Contex 
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  var data, token, type, decodedToken;
  async function getData(type) {
    data = await axios.post(`/${type}login`, {
      uemail: decodedToken.email,
      upass: decodedToken.pass,
    })

    if(type==="user"){
      setloginuser(data.data);
    }
    if(type === "restaurent"){
      setfirst(data?.data?.data);
      console.log(data.data.data);
    }
  }
  
  useEffect(()=>{
    console.log(first);
    setloginrestaurant(first);
  },[first])
  
  
  useEffect(() => {
    token = getCookie("token");
    type = getCookie("type");
      decodedToken = jwt_decode(token);
      getData(type);
  }, [])


  var links = document.querySelectorAll('.navlinkss');
  if(links.length > 0){
    links.forEach((link) => {
      link.addEventListener('click', (e) => {

        links.forEach((link) => {
          link.classList.remove('active');
        });
        
        link.classList.add('active');
      });
    });
  }

  const finalCall= () => {
    localStorage.clear();
  }

  // console.log(loginrestaurant);

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
              <li><Link className="navlinkss" to='../login'>Login</Link></li>
              <li><Link className="navlinkss" to="../signup" >Signup</Link></li>
            </ul>
            :
            <ul>
              <li><Link className='navlinkss ${active}' to="restaurenthome" >Profile</Link></li>
              <li><Link className='navlinkss' to="restaurenthome/menus" >Menu</Link></li>
              <li><Link className='navlinkss' to="restaurenthome/restaurantorders" >Orders</Link></li>
              <li><Link className='navlinkss' onClick={finalCall} to="..\..\login" >LogOut</Link></li>
            </ul>
        }
      </nav>
        <Outlet />
    </>
  )
}

export default Navbar