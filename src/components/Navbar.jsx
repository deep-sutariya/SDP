import React from 'react'
import { Link, Outlet } from "react-router-dom";
import './style/Navbar.css';


function Navbar(props) {

  var links = document.querySelectorAll('.navlinkss');
  
  if(links.length > 0){
    links.forEach((link) => {
      link.addEventListener('click', (e) => {

        links.forEach((link) => {
          link.classList.remove('.active');
        });
        
        link.classList.add('active');
      });
    });
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
              <li><a className="navlinkss active" href="/" >Home</a></li>
              <li><a className="navlinkss" href="orders" >orders</a></li>
              <li><a className="navlinkss" href="login" >Login</a></li>
              <li><a className="navlinkss" href="signup" >Signup</a></li>
            </ul>
            :
            <ul>
              <li><Link className='navlinkss active' to="" >Profile</Link></li>
              <li><Link className='navlinkss' to="menus" >Menu</Link></li>
              <li><Link className='navlinkss' to="restaurantorders" >Orders</Link></li>
              <li><Link className='navlinkss' to="..\..\" >LogOut</Link></li>
            </ul>
        }
      </nav>
    </>
  )
}

export default Navbar