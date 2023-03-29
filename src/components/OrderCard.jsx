import React from "react";
import "../components/style/ResMenuCard.css";

const ResMenuCard = (props) => {


  const doSomething = (e) => {
    const ele = document.getElementById("show");
    if (ele.style.display === "block") {
      ele.style.display = "none";
    } else {
      ele.style.display = "block";
      ele.style.border = "1px solid rgba(128, 128, 128, 0.581);";
    }
  }; 


  return (
    <>
      <div className="resmenucardmain">
        <div className="menuBtn" style={{display: "flex", justifyContent: "space-between",alignItems: "center"}} id="pop" onClick={doSomething}>
            <h3>OrderName</h3>

            <h3>{new Date().toLocaleString()}</h3>
        </div>


        <div className="panel" id="show">
          <div className="menuPanel">
            <div className="infoGrid">
              <label>Description :</label>
              <p>
                "Gaurav is great"
              </p>
            </div>
            <div className="infoGrid">
              <label>Price :</label>
              <p>1002</p>
            </div>
            <div className="infoGrid">
              <label>Type :</label>
              <p>Type</p>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default ResMenuCard;
