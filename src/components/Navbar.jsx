import React from 'react'
import './style/Navbar.css';
// import { Outlet, Link } from "react-router-dom";


function Home(props) {

  return (
    <nav className='navbar'>
      <input type="checkbox" id="check" />
      <label for="check" className="checkbtn">
        <i className="fas fa-bars"></i>
      </label>
      <label className="logo">BookMyMeal</label>
      <ul>
        <li><a className="active" href="sadkbj">Home</a></li>
        <li><a href="sadkbj">About</a></li>
        <li><a href="sadkbj">Services</a></li>
        <li><a href="sadkbj">Contact</a></li>
        <li><a href="sadkbj">Logout</a></li>
      </ul>
    </nav>

  )
}

export default Home