import React, { useState } from "react";
import "../components/style/ResMenuCard.css"; // order card css is inserted in this file at the bottom.
import OrderCard from "../components/OrderCard";
import UserOrderCard from "./UserOrderCard";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
const RestaurantOrders = () => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  
  const getOrders = async (token, month) => {
    let decodedTokenRestaurant = jwt_decode(token);

    const data = await axios.post("/getrestaurantorder", {
      email: decodedTokenRestaurant.email,
      month: month,
    });
    setorderData(data?.data);
  };

  const handleChange = (e) => {
      let month = e.target.value;
      getOrders(getCookie("token"),month);
  }

  useEffect(() => {
    getOrders(getCookie("token"), "all");
  },[]);
  const [orderData, setorderData] = useState();

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
        <h1 style={{ marginBottom: "10px" }}>ORDERS</h1>
        <hr style={{ marginBottom: "20px" }} />
        {orderData && orderData.length > 0 ? (
          orderData.map((element, index) => {
            return (
              <>
                {" "}
                <UserOrderCard key={element.orderid} orderData={element} />
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
