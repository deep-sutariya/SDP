import React,{useState} from "react";
import axios from "axios";
import "../components/style/UserOrderCard.css";
import { element } from "prop-types";
import jwt_decode from "jwt-decode";
const UserOrderCard = (props) => {
  const ordermenu = props.orderData.ordermenu;
  const orderid = props.orderData.orderid;
  const ordermonth = props.orderData.ordermonth;
  const ordertime = props.orderData.ordertime;
  const ordertotal = props.orderData.ordertotal;
  const orderstatus = props.orderData.orderstatus;
  const [first, setfirst] = useState(ordertotal)

  const view = () => {
    document.getElementById('view').style.display = "flex";
    document.getElementById('OrderContainer').style.display = "none";
  };
  const disable = () => {
    document.getElementById('view').style.display = "none";
    document.getElementById('OrderContainer').style.display = "block";
    console.log("ashdvsa");
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const handleChange = async(e) => {

    const decodedTokenRestaurant = jwt_decode(getCookie("token"));
    console.log(e.target.value);
    const data = await axios.post("/updatestatus",{
      email : decodedTokenRestaurant.email,
      orderid : e.target.id,
      status : e.target.value
    });

    console.log(data);

  }

  return (
    <>

      <div className="OrderContainer" id="OrderContainer">
        <hr />
        <div className="orderinfo">
          <p>OrderID : {orderid} {"     "} {orderstatus}</p>
          <p>{ordertime}</p>
        </div>
        <table id="customers">
          <tbody>
            <tr>
              <th>Item</th>
              <th>No Of Item</th>
              <th>Price</th>
            </tr>
            {ordermenu &&
              ordermenu.map((element, index) => {
                return (
                  <tr>
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
        {
          getCookie("type") === "user"  ?  <button
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
        </button> :
        <div className="res-select">
          <select id={orderid} onChange={handleChange}>
            <option defaultValue value="0">
              Update Status
            </option>
            <option value="1">Order Confirmed</option>
            <option value="2">Order Prepared</option>
            <option value="3">Order Deny</option>
          </select>

          { (orderstatus === "0") ? <p className="status accept">order Confirmed</p> : <></> }
          { (orderstatus === "1") ? <p className="status prepared">order Confirmed</p> : <></> }
          { (orderstatus === "2") ? <p className="status confirmed">order Confirmed</p> : <></> }
          { (orderstatus === "3") ? <p className="status deny">order Confirmed</p> : <></> }
        </div>
        }
        <hr />
      </div>
    </>
  );
};

export default UserOrderCard;
