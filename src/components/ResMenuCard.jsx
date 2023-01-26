import React from "react";
import "../components/style/ResMenuCard.css";

const ResMenuCard = ({ id, name, price, des }) => {
  const doSomething = (e) => {
    console.log("in function");
    console.log(e.target.id);
    const ele = document.getElementById("panel1");
    console.log(ele);
    console.log(ele.style.display);
    if (ele.style.display === "block") {
      ele.style.display = "none";
    } else {
      ele.style.display = "block";
    }
  };

  return (
    <>
      <button class="menuBtn" id="1" onClick={doSomething}>
        Pizza
      </button>

      <div class="panel" id="panel1">
        <div class="menuPanel">
          <div class="infoGrid">
            <label>Description :</label>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis dolorem veniam dolore alias ut, delectus officia esse
              voluptas ad ipsum laboriosam minima! Itaque ab qui fuga
              perspiciatis, temporibus aliquid odit.
            </p>
          </div>
          <div class="infoGrid">
            <label>Price :</label>
            <p>Price</p>
          </div>
          <div class="infoGrid">
            <label>Type :</label>
            <p>Type</p>
          </div>
          <div>
            <a class="modify_button" href="#popup1">
              Edit
            </a>
            <a class="modify_button removeitem">
              Remove
            </a>
            </div>
        </div>

        <div id="popup1" class="overlay">
          <div class="popup">
            <h2>Edit Menu Item</h2>
            <a class="close" href="#">
              &times;
            </a>
            <hr />
            <div class="popup_info">
              <label>Item Name:</label>
              <input type="text" placeholder="Menu Item name" />
              <label>Price:</label>
              <input type="number" placeholder="Menu Item Price" />
              <label>Description:</label>
              <input type="textarea" placeholder="Description" />
            </div>
              <button class="popup_btn save">Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResMenuCard;
