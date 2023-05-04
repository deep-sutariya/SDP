import React, { useState } from "react";
import "../components/style/ResMenuCard.css"; // order card css is inserted in this file at the bottom.
import UserOrderCard from "./UserOrderCard";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { io } from 'socket.io-client'
const socket = io("http://localhost:5000");

const RestaurantOrders = (props) => {
  const [orderData, setorderData] = useState();
  const getOrders = async (token, month) => {
    let decodedTokenRestaurant = jwt_decode(token);
    
    const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/getrestaurantorder`, {
      email: decodedTokenRestaurant.email,
      month: month,
    });
    setorderData(data?.data);
  };
  
  const handleChange = (e) => {
    let month = e.target.value;
    getOrders(sessionStorage.getItem("token"), month);
  };

  useEffect(() => {
    
    getOrders(sessionStorage.getItem("token"),"all");
    
    socket.on("connect", () => {
			console.log("connected");
		});
		socket.on("disconnect", () => {
      console.log("disconnected");
      socket.disconnect();
		});
    
    socket.on("load-resources",(payload) => {
      getOrders(sessionStorage.getItem("token"),"all");
    })

		return () => {
			socket.off("connect");
			socket.off("disconnect");
      socket.off("load-resources");
		};

  },[])

  return (
    <>
      <div className="custom-select">
        <select onChange={handleChange}>
          <option defaultValue value="all">
            ALL
          </option>
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
      <h1 className="custom-select" style={{ marginBottom: "10px" }}>ORDERS</h1>
      <hr style={{ marginBottom: "20px" }} />
      {orderData && orderData.length > 0 ? (
        orderData.map((element, index) => {
          return (
            <>
              {" "}
              <UserOrderCard key={element.orderid} orderData={element} />
              {/*  //socket={props.socket} */}
            </>
          );
        })
      ) : (
        <h1 style={{ textAlign: "center" }}>No Orders in Selected Month</h1>
      )}
    </>
  );
};

export default RestaurantOrders;
