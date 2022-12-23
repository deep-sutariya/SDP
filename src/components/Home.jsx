import React from 'react'
import './style/home.css';
import { Outlet, Link, useSearchParams } from "react-router-dom";


function Home() {
  const [data] = useSearchParams();
  // const uemail = data.get("uemail");
  const uname = data.get("uname");
  // const uphone = data.get("uphone");
  
  return (
    <div>
        <nav>
        <div className='userName'>{uname}</div>
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