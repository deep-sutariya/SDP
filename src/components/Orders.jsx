import React from 'react';
import Navbar from './Navbar';
import './style/orders.css';


function Orders({setNavType}) {
  setNavType("user");
  // const location = useLocation();
  // const data = location.state.data;
  // console.log(data);
  return (
    <>
      <div className='mainorder'>orders Page</div>
    </>
  )
}

export default Orders