import React from 'react';
import Navbar from './Navbar';
import './style/orders.css';
import UserOrderCard from './UserOrderCard';

function Orders({setNavType}) {
  setNavType("user");
  // const location = useLocation();
  // const data = location.state.data;
  // console.log(data);
  return (
    <>
      <UserOrderCard />
    </>
  )
}

export default Orders