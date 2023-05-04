import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import './style/orders.css';
import UserOrderCard from './UserOrderCard';
import jwt_decode from "jwt-decode";
import { LoginDetails } from '../contex/Logincontex';
import BounceLoader from "react-spinners/BounceLoader";
import { io } from 'socket.io-client'
const socket = io("http://localhost:5000");

function Orders(props) {

  const { loginrestaurant, loginuser } = useContext(LoginDetails);

  const [orderData, setorderData] = useState();
  const [loading, setLoading] = useState();

  const getOrder = async (token, month) => {

    let decodedTokenUser = jwt_decode(token);

    setLoading(true);
    const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/getuserorder`, {
      email: decodedTokenUser.email,
      month: month
    });

    setLoading(false);
    setorderData(data?.data);

  }


  const handleChange = (e) => {
    let month = e.target.value;
    getOrder(sessionStorage.getItem("token"), month);
  }

  useEffect(() => {

    getOrder(sessionStorage.getItem("token"), "all");
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
      socket.disconnect();
    });

    socket.on("load-resources", (payload) => {
      getOrder(sessionStorage.getItem("token"), "all");
      console.log(payload);
    })

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("load-resources");
    };

  }, [])

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
        loginrestaurant || loginuser ?
          !loading ?
            orderData && orderData.length > 0 ? orderData.map((element, index) => {
              return (<> <UserOrderCard key={element.orderid} socket={props.socket} orderData={element} />
              </>)
            })
              : <h1 style={{ textAlign: "center" }}>No Orders in Selected Month</h1>
            : <div className="loader"><BounceLoader
              size={50}
              color="black"
              aria-label="Loading Spinner"
              data-testid="loader"
            /> </div>
          : <h1>Login First..!</h1>
      }
    </>
  )
}

export default Orders