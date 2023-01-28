import axios from "axios";
import React, { useContext, useState } from "react";
import "../components/style/ResMenuCard.css";
import { LoginDetails } from "../contex/Logincontex";

const ResMenuCard = ({ id, name, price, des, type, index }) => {
  const placeit = "panel" + index;
  const placea = "#popup" + index;
  const placeaid = "popup" + index;

  const placeitr = "editpanel" + index;
  const placear = "#popupedit" + index;
  const placeaidr = "popupedit" + index;

  const { loginrestaurant } = useContext(LoginDetails);


  const [menu, setMenu] = useState({
    name: name,
    des: des,
    price: price,
    type: type
  })

  const [resMenu, setResMenu] = useState({
    name: name, price: price, des: des
  })

  const doSomething = (e) => {
    console.log("in function");
    const ele = document.getElementById(placeit);
    if (ele.style.display === "block") {
      ele.style.display = "none";
    } else {
      ele.style.display = "block";
      ele.style.border = "1px solid rgba(128, 128, 128, 0.581);";
    }
  };

  const EditMenu = async (e) => {

    console.log("EditMenu")

    const data = await axios.post("/editmenu", {
      resid: loginrestaurant._id,
      menuIndex: e.target.id,
      newData: menu
    });

    console.log(data);
  }

  let n, value;
  const updateMenu = (e) => {
    n = e.target.name;
    value = e.target.value;
    setMenu({ ...menu, [n]: value })
  }

  const RemoveMenu = async (e) => {

    const data = await axios.post("/removemenu", {
      resid: loginrestaurant._id.toString(),
      iid: loginrestaurant.rmenu[e.target.id]._id.toString()
    })
    alert(data.data.message);
  }



  return (
    <>
      <div className="resmenucardmain">
        <button className="menuBtn" id={index} onClick={doSomething}>
          {resMenu.name}
        </button>

        <div className="panel" id={placeit}>
          <div className="menuPanel">
            <div className="infoGrid">
              <label>Description :</label>
              <p>
                {resMenu.des}
              </p>
            </div>
            <div className="infoGrid">
              <label>Price :</label>
              <p>{resMenu.price}</p>
            </div>
            <div className="infoGrid">
              <label>Type :</label>
              <p>Type</p>
            </div>
            <div>
              <a className="modify_button modify_edit" href={placea}>
                Edit
              </a>
              <a className="modify_button removeitem" href={placear}>
                Remove
              </a>
            </div>
          </div>


          {/* Remove Item */}
          <div id={placeaidr} className="overlay">
            <div className="popup">
              <h2>Are You Sure ?</h2>
              <a className="close" href="#">
                &times;
              </a>
              <hr />
              <button className="popup_btn save" id={index} onClick={RemoveMenu}>Remove</button>
            </div>
          </div>


          <div id={placeaid} className="overlay">
            <div className="popup">
              <h2>{placeaid}</h2>
              <a className="close" href="#">
                &times;
              </a>
              <hr />
              <div className="popup_info">
                <label>Item Name:</label>
                <input type="text" placeholder="Menu Item name" name="name" value={menu.name} onChange={updateMenu} />
                <label>Price:</label>
                <input type="number" placeholder="Menu Item Price" name="price" value={menu.price} onChange={updateMenu} />
                <label>Description:</label>
                <input type="textarea" placeholder="Description" name="des" value={menu.des} onChange={updateMenu} />
                <label>Type:</label>
                <input type="textarea" placeholder="Type" name="type" value={menu.type} onChange={updateMenu} />
              </div>
              <button className="popup_btn save" id={index} onClick={EditMenu}>Save</button>
            </div>
          </div>


        </div>
      </div>
    </>
  )
}

export default ResMenuCard;
