import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style/orders.css';
import UserOrderCard from './UserOrderCard';
import jwt_decode from "jwt-decode";
import { io } from 'socket.io-client'
// import axios from 'axios';

function Orders() {
  const [orderData,setorderData] = useState();
  

  // const socket = io.connect("http://localhost:5000");

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const getOrder = async (token,month) => {

    let decodedTokenUser = jwt_decode(token);
    console.log(month);
    const data = await axios.post(`/getuserorder`, {
      email : decodedTokenUser.email,
      month: month
    });
    console.log(data);
    setorderData(data?.data);

  }


  const handleChange = (e) => {
      let month = e.target.value;
     getOrder(getCookie("token"),month);
  }

  useEffect(() => {
    getOrder(getCookie("token"),"all");
  },[])
  useEffect(() => {
    console.log(orderData);
    // socket.on("chat",(payload) => {
    //   console.log(payload);
    // })
  },[orderData])

  return (
    <>
      <div className='custom-select'>
        <select onChange={handleChange}>
          <option defaultValue value="all">ALL</option>
          <option value="january">January</option>
          <option value="february">February</option>
          <option value="march">March</option>
          <option value="april">April</option>
          <option value="may">May</option>
          <option value="june">June</option>
          <option value="july">July</option>
          <option value="august">August</option>
          <option value="september">September</option>
          <option value="october">October</option>
          <option value="november">November</option>
          <option value="december">December</option>
        </select>
      </div>

      {
        orderData && orderData.length > 0 ? orderData.map((element,index) => {
          return ( <> <UserOrderCard key={element.orderid} orderData={element} /> 
          </> )
        }) : <h1 style={{textAlign: "center"}}>No Orders in Selected Month</h1>
      }
    </>
  )
}

export default Orders