import React from 'react'
import './style/Navbar.css';
import { Outlet, Link } from "react-router-dom";


function Home(props) {

  return (
    <div>
      <nav className='navbar'>
        <div className='nav_logo'><Link className='anchor_tag' to="/">BookMyMeal</Link></div>
        {props.type==="user" ?

              <ul className='nav_ui'>
                <li className='nav_li'>
                  <Link to="/orders" className='anchor_tag'>Orders</Link>
                </li>
                <li className='nav_li'>
                  <Link to="/login"><button className="general_button_login">Login</button></Link>
                </li>
                <li className='nav_li'>
                  <Link to="/signup"><button className="general_button">SignUp</button></Link>
                </li>
              </ul> 
              
              : 
              
              <ul className='nav_ui'>
                <li className='nav_li'>
                  <Link to="/restaurantorders" className='anchor_tag'>Orders</Link>
                </li>
                <li className='nav_li'>
                  <Link to="/login"><button className="general_button">Log out</button></Link>
                </li>
              </ul>
          }

      </nav>
      <Outlet />
    </div>

  )
}

export default Home