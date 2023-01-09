import React from 'react'
import './style/Navbar.css';
import { Outlet, Link, useSearchParams } from "react-router-dom";


function Home() {
  const [data] = useSearchParams();
  // const uemail = data.get("uemail");
  const uname = data.get("uname");
  // const uphone = data.get("uphone");

  return (
    <div>
      <nav className='navbar'>
        <div className='nav_logo'><Link className='anchor_tag' to="/">BookMyMeal</Link></div>
        {!uname ?
                   
                    <ul className='nav_ui'>
                      <li className='nav_li'>
                        <Link to="/login"><button className="general_button_login">Login</button></Link>
                      </li>
                      <li className='nav_li'>
                        <Link to="/signup"><button className="general_button">SignUp</button></Link>
                      </li>
                    </ul> :  <ul>
                                <li className='nav_li'>
                                  <Link to="/orders">Orders</Link>
                                </li>
                                <li className='nav_li'>
                                  <Link to="/login">Log Out</Link>
                                </li>
                              </ul>}
      </nav>
      <Outlet />
    </div>

  )
}

export default Home