import React from "react";
import "../components/style/ResMenuCard.css"; // order card css is inserted in this file at the bottom.
import OrderCard from '../components/OrderCard';
const RestaurantOrders = () => {


  return (
    <>
    <div className="menublock ordercard">
      <h1 style={{marginBottom: "10px"}}>ORDERS</h1>
      <hr style={{marginBottom: "20px"}}/>
      <OrderCard />
    </div>
    </>
  )
}

export default RestaurantOrders;
