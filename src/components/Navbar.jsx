import React from 'react'
import './style/Navbar.css';
// import { Outlet, Link } from "react-router-dom";


function Home(props) {

  return (
    <nav className='navbar'>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fas fa-bars"></i>
      </label>
      <label className="logo">BookMyMeal</label>
      <ul>
        <li><a className="active" href="/">Home</a></li>
        {/* <li><a href="sadkbj"></a></li> */}
        <li><a href="orders">orders</a></li>
        <li><a href="login">Login</a></li>
        <li><a href="signup">Signup</a></li>
      </ul>
    </nav>

  )
}

export default Home