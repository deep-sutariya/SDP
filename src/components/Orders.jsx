import React from 'react';
import Navbar from './Navbar';
import './style/orders.css';


function Orders() {
  // const location = useLocation();
  // const data = location.state.data;
  // console.log(data);
  return (
    <>
    <Navbar type="user" />
      <div className='mainorder'>orders Page</div>
    </>
  )
}

export default Orders