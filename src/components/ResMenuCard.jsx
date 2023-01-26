import React from "react";
import "../components/style/ResMenuCard.css";

const ResMenuCard = ({ id, name, price, des ,index }) => {
  const placeit = "panel" + index;
  const placea = "#popup" + index;
  const placeaid = "popup" + index;
  const doSomething = (e) => {
    console.log("in function");
    console.log(e.target.id);
    const ele = document.getElementById(placeit);
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
    <div className="resmenucardmain">
      <button class="menuBtn" id={index} onClick={doSomething}>
        {name}
      </button>

      <div class="panel" id={placeit}>
        <div class="menuPanel">
          <div class="infoGrid">
            <label>Description :</label>
            <p>
              {des}
            </p>
          </div>
          <div class="infoGrid">
            <label>Price :</label>
            <p>{price}</p>
          </div>
          <div class="infoGrid">
            <label>Type :</label>
            <p>Type</p>
          </div>
          <div>
            <a class="modify_button" href={placea}>
              Edit
            </a>
            <a class="modify_button removeitem">
              Remove
            </a>
            </div>
        </div>

        <div id={placeaid} class="overlay">
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
      </div>
    </>
  );
};

export default ResMenuCard;
