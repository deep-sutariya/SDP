import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import './style/orders.css';
import UserOrderCard from './UserOrderCard';
import { LoginDetails } from '../contex/Logincontex';

function Orders({setNavType}) {
  const [orderData,setorderData] = useState();
  const {loginuser} = useContext(LoginDetails);
  console.log(loginuser);

  useEffect(()=>{
    setNavType("user");
  },[]);


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