import React from 'react'
import './style/home.css';
import { Outlet, Link } from "react-router-dom";

function Home() {
  return (
    <div>
        <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default Home