import React, { useState } from "react";
import axios from "axios";
import "../components/style/UserOrderCard.css";
import { io } from "socket.io-client";
import jwt_decode from "jwt-decode";
const UserOrderCard = (props) => {
  const ordermenu = props.orderData.ordermenu;
  const orderid = props.orderData.orderid;
  const ordermonth = props.orderData.ordermonth;
  const ordertime = props.orderData.ordertime;
  const ordertotal = props.orderData.ordertotal;
  const orderstatus = props.orderData.orderstatus;
  const [first, setfirst] = useState(ordertotal);

  const socket = io.connect("http://localhost:5000");

  const handleChange = async (e) => {
    const decodedTokenRestaurant = jwt_decode(sessionStorage.getItem("token"));
    console.log(e.target.value);
    const data = await axios.post("/updatestatus", {
      email: decodedTokenRestaurant.email,
      orderid: e.target.id,
      status: e.target.value,
    });
    socket.emit("changeinstatus", { message: "status changed" });

    console.log(data);
  };

  return (
    <>
      <div className="OrderContainer" id="OrderContainer">
        <hr />
        <div className="orderinfo">
          <p>
            OrderID : {orderid} {"     "} {orderstatus}
          </p>
          <p>{ordertime}</p>
        </div>
        <table id="customers">
          <tbody>
            <tr>
              <th>Item</th>
              <th>No Of Item</th>
              <th>Price</th>
            </tr>
            {ordermenu && Object.keys(ordermenu).length > 0 &&
              Object.keys(ordermenu).map((element, index) => {
                return (
                  <tr key={index} >
                    <td>{element.itemname}</td>
                    <td>{element.noOfItem}</td>
                    <td>{element.price}</td>
                  </tr>
                );
              })}
            <tr>
              <td colSpan="2" style={{ fontWeight: "bolder" }}>
                Total Amount
              </td>
              <td style={{ fontWeight: "bolder" }}>{ordertotal}</td>
            </tr>
          </tbody>
        </table>
        {sessionStorage.getItem("type") === "user" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              style={{
                marginBottom: "5px",
                width: "auto",
                borderRadius: "5px",
                backgroundColor: "#04AA6D",
                border: "none",
                padding: "10px",
                color: "white",
                fontWeight: "bolder",
              }}
            >
              Download Reciept{" "}
            </button>
            {orderstatus === "0" ? (
              <p className="status accept">order Not Accepted</p>
            ) : (
              <></>
            )}
            {orderstatus === "2" ? (
              <p className="status prepared">order Prepared</p>
            ) : (
              <></>
            )}
            {orderstatus === "1" ? (
              <p className="status confirmed">order Confirmed</p>
            ) : (
              <></>
            )}
            {orderstatus === "3" ? (
              <p className="status deny">order Deny</p>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className="res-select">
            <select id={orderid} onChange={handleChange}>
              <option defaultValue value="0">
                Update Status
              </option>
              <option value="1">Order Confirmed</option>
              <option value="2">Order Prepared</option>
              <option value="3">Order Deny</option>
            </select>

            {orderstatus === "0" ? (
              <p className="status accept">order Not Accepted</p>
            ) : (
              <></>
            )}
            {orderstatus === "2" ? (
              <p className="status prepared">order Prepared</p>
            ) : (
              <></>
            )}
            {orderstatus === "1" ? (
              <p className="status confirmed">order Confirmed</p>
            ) : (
              <></>
            )}
            {orderstatus === "3" ? (
              <p className="status deny">order Deny</p>
            ) : (
              <></>
            )}
          </div>
        )}
        <hr />
      </div>
    </>
  );
};

export default UserOrderCard;
