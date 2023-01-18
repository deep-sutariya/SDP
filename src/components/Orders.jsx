import React from 'react'
import './style/orders.css'
import { useSearchParams } from "react-router-dom";
function Orders() {
  const [data] = useSearchParams();
  console.log("dajdad");
  console.log(data.get("uname"));
  return (
    <div>orders Page</div>
  )
}

export default Orders