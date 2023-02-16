import React from "react";
import axios from 'axios'
import "../components/style/UserOrderCard.css";
const UserOrderCard = () => {

  const GenerateBill = async () => {
    console.log("clisk")
    await axios.get("/generatebill");

  }

  return (
    <div className="OrderContainer">
      <h1>Order</h1>
      <table id="customers">
        <tr>
          <td colspan="3" style={{textAlign: "center",fontWeight: "bolder",fontSize: "2rem"}}>DEMO OF ORDER PAGE</td>
        </tr>
        <tr>
          <th>Item</th>
          <th>No Of Item</th>
          <th>Price</th>
        </tr>
        <tr>
          <td>Dhosa</td>
          <td>2</td>
          <td>70</td>
        </tr>
        <tr>
          <td>Dabeli</td>
          <td>1</td>
          <td>20</td>
        </tr>
        <tr>
          <td>Pani Puri</td>
          <td>2</td>
          <td>10</td>
        </tr>
        <tr>
          <td>Samose</td>
          <td>3</td>
          <td>70</td>
        </tr>
        <tr>
          <td>Burigir</td>
          <td>8</td>
          <td>180</td>
        </tr>
        <tr>
          <td colspan="2" style={{fontWeight: "bolder"}}>Total Amount</td>
          <td style={{fontWeight: "bolder"}}>350</td>
        </tr>

      </table>
          <button style={{width: "20%",float: "right",borderRadius:"5px",backgroundColor:"#04AA6D",border: "none",padding: "10px",marginTop:"5px",color:"white",fontWeight:"bolder"}} onClick={GenerateBill} >Download Reciept </button>
    </div>
  );
};

export default UserOrderCard;