import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/style/UserOrderCard.css";
import starimage from '../assets/rating.png'
import jwt_decode from "jwt-decode";


const UserOrderCard = (props) => {
  const ordermenu = props.orderData.ordermenu;
  const orderid = props.orderData.orderid;
  const ordermonth = props.orderData.ordermonth;
  const restaurantid = props.orderData.restaurantid;
  const ordertime = props.orderData.ordertime;
  const ordertotal = props.orderData.ordertotal;
  const orderstatus = props.orderData.orderstatus;
  const resname = props.orderData.resname;
  const [rating, setRating] = useState(3);
  const [help, setHelp] = useState("");

  const changeRating = (e) => {
    let n = parseInt(e.target.id);
    setRating(n);
    for(let i = 1;i <= 5;i++){
      let ele = document.getElementById(i+"");
      if(i <= n){
        ele.classList.add("checked");
      }else{
        ele.classList.remove("checked");
      }
    }
  }

  const handleChange = async (e) => {
    const decodedTokenRestaurant = jwt_decode(sessionStorage.getItem("token"));
    
    const data = await axios.post("/updatestatus", {
      email: decodedTokenRestaurant.email,
      orderid: e.target.id,
      status: e.target.value,
    });

  };
  function openPopup(e){
    let popup = document.getElementById("popup");
    popup?.classList.add("open-popup");
  }
  async function closePopup(e){
    let popup = document.getElementById("popup");
    popup?.classList.remove("open-popup");
    
    const data = await axios.post("/updaterating",{
      rating:rating,
      resid: e.target.id
    })
  }

  return (
    <>
      <div className="OrderContainer" id="OrderContainer">
        <hr />
        <div className="orderinfo">
          <p>OrderID : {orderid}</p>
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
              Object.entries(ordermenu).map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{element[1].itemname}</td>
                    <td>{element[1].noOfItem}</td>
                    <td>{element[1].price}</td>
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
            <div>
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
                <button type="submit" className="ratingbtn" id={orderid} onClick={openPopup}>
                  Rating
                </button>
                <div className="ratingpopup" id="popup">
                  <img src={starimage} alt="rating" />
                  <h2>Thank You for Ordering !</h2>
                  <p>{resname}</p>
                  <span id="1" onClick={changeRating} className="fa fa-star checked"></span>
                  <span id="2" onClick={changeRating} className="fa fa-star checked"></span>
                  <span id="3" onClick={changeRating} className="fa fa-star checked"></span>
                  <span id="4" onClick={changeRating} className="fa fa-star"></span>
                  <span id="5" onClick={changeRating} className="fa fa-star"></span>
                  <button id={restaurantid} onClick={closePopup}>Submit</button>
                </div>
            </div>
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
