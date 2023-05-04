import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/style/UserOrderCard.css";
import starimage from '../assets/rating.png'
import jwt_decode from "jwt-decode";

import jsPDF from 'jspdf'

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

  const changeRating = (e) => {
    let n = parseInt(e.target.id);
    setRating(n);
    for (let i = 1; i <= 5; i++) {
      let ele = document.getElementById(i + "");
      if (i <= n) {
        ele.classList.add("checked");
      } else {
        ele.classList.remove("checked");
      }
    }
  }

  const handleChange = async (e) => {
    const decodedTokenRestaurant = jwt_decode(sessionStorage.getItem("token"));

    const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/updatestatus`, {
      email: decodedTokenRestaurant.email,
      orderid: e.target.id,
      status: e.target.value,
    });
  };
  function openPopup(e) {
    let popup = document.getElementById("popup");
    popup?.classList.add("open-popup");
  }
  async function closePopup(e) {
    let popup = document.getElementById("popup");
    popup?.classList.remove("open-popup");

    const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/updaterating`, {
      rating: rating,
      resid: e.target.id
    })
  }

  const DownloadRecipt = () => {
    var doc = new jsPDF('p', 'pt');

    // doc.text(width,height,text)
    doc.text(230,40,"BOOKMYMEAL");
    doc.text(50, 100, "Restaurant Name: ");
    doc.text(200, 100, `${resname}`);
    doc.text(50, 120, "Ordertime: ");
    doc.text(200,120,ordertime);
    doc.text(50,140,"OrderId: ");
    doc.text(200,140,`${orderid}`);
    doc.text(50,160,"Order Items :- ");
    doc.text(50,180,"Item Name");
    doc.text(200,180,"no of item");
    doc.text(300,180,"Price Per Item");
    doc.text(480,180,"Total");
    doc.addFont('helvetica', 'normal');
    Object.entries(ordermenu).map((ele,index)=>{
      doc.text(10,200+20*index,`${index+1}.)`)
      doc.text(50, 200+(20*index), `${ele[1].itemname}`);
      doc.text(200, 200+(20*index), `${ele[1].noOfItem}`);
      doc.text(300, 200+(20*index), `${ele[1].price}`);
      doc.text(480, 200+(20*index), `${parseInt(ele[1].price)*ele[1].noOfItem}`);
    })
    doc.text(50,200+ordermenu.length*20+10,"-----------------------------------------------------------------------------------");
    doc.text(50, 200+ordermenu.length*20+30, `Total Amount : ${ordertotal}`);
    doc.text(230,800,"Thanks For Visiting !");

    doc.save(`${orderid}.pdf`);
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
              <button id={orderid} onClick={DownloadRecipt}
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
                Download Receipt{" "}
              </button>
              <button type="submit" className="ratingbtn" id={orderid} onClick={openPopup}>
                Rating
              </button>
              <div className="ratingpopup" id="popup">
                <h3 onClick={closePopup} style={{ float:"right", cursor:'pointer' }}>X</h3>
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
