import axios from "axios";
import React, { useContext, useState } from "react";
import "../components/style/ResMenuCard.css";
import { LoginDetails } from "../contex/Logincontex";

const ResMenuCard = ({
  id,
  name,
  price,
  des,
  type,
  index,
  setRestaurantMenu,
}) => {
  const placeit = "panel" + index;
  const placea = "#popup" + index;
  const placeaid = "popup" + index;
  const placear = "#popupedit" + index;
  const placeaidr = "popupedit" + index;

  const { loginrestaurant } = useContext(LoginDetails);
  const [openRemovePopup, setOpenRemovePopup] = useState(false);

  const [menu, setMenu] = useState({
    name: name,
    des: des,
    price: price,
    type: type,
    image: "",
  });

  const [resMenu, setResMenu] = useState({
    name: name,
    price: price,
    des: des,
    type: type,
  });

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

  const UploadImage = async () => {
    const formData = new FormData();
    formData.append("file", menu.image);
    formData.append("upload_preset", "guydx3xf");
    formData.append("cloud_name", "dt6unpuse");
    const data = await axios.post(
      "https://api.cloudinary.com/v1_1/dt6unpuse/image/upload",
      formData
    );

    return data?.data?.secure_url;
  };

  const EditMenu = async (e) => {
    let image_url = await UploadImage();
    setMenu({ ...menu, ["image"]: image_url });
    const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/editmenu`, {
      resid: loginrestaurant._id,
      menuIndex: e.target.id,
      newData: menu,
      image_url: image_url,
    });
  };

  let n, value;
  const updateMenu = (e) => {
    n = e.target.name;
    value = e.target.value;
    console.log(n);
    if (n === "image") {
      console.log(e.target.files[0].name);
      setMenu({ ...menu, [n]: e.target.files[0] });
      console.log(document.getElementById("nameoffile"));

      document.getElementById("nameoffilee").innerText = e.target.files[0].name;
      document.getElementById("labell").innerText = "";
    } else setMenu({ ...menu, [n]: value });
  };

  const RemoveMenu = async (e) => {
    console.log(loginrestaurant.rmenu[e.target.id]);
    const data = await axios.post("/removemenu", {
      resid: loginrestaurant._id.toString(),
      iid: loginrestaurant.rmenu[e.target.id]._id.toString(),
    });
    setOpenRemovePopup(false);
    setRestaurantMenu(data?.data?.data);
    alert(data.data.message);
  };

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
              <p>{resMenu.des}</p>
            </div>
            <div className="infoGrid">
              <label>Price :</label>
              <p>{resMenu.price}</p>
            </div>
            <div className="infoGrid">
              <label>Type :</label>
              <p>{resMenu.type}</p>
            </div>
            <div>
              <a className="modify_button modify_edit" href={placea}>
                Edit
              </a>
              {/* <a className="modify_button removeitem" href={placear}>
                Remove
              </a> */}
              <button
                className="modify_button removeitem"
                onClick={() => setOpenRemovePopup(true)}
              >
                Remove
              </button>
            </div>
          </div>

          {/* <div id={placeaidr} className="overlay"> */}
          {/* Remove Item */}
          {/* <div className="overlay"> */}
          {/* <a className="close" href="#">
                  &times;
                </a> */}
          {openRemovePopup ? (
            <div className="addmenu_popup">
              <div style={{display: "flex",justifyContent:"space-between"}}>
                <h2>Are You Sure ?</h2>
                <button
                  className="close"
                  style={{fontWeight: "bold",fontSize: "30px",border: "none",background:"none"}}
                  onClick={() => setOpenRemovePopup(false)}
                >
                  &times;
                </button>
              </div>
              <hr />
              <button
                className="popup_btn save"
                id={index}
                onClick={RemoveMenu}
              >
                Remove
              </button>
            </div>
          ) : (
            <></>
          )}
          {/* </div> */}

          <div id={placeaid} className="overlay">
            <div className="popup">
              <h2>Edit Menu</h2>
              <a className="close" href="#">
                &times;
              </a>
              <hr />
              <div className="popup_info">
                <label>Item Name:</label>
                <input
                  type="text"
                  placeholder="Menu Item name"
                  name="name"
                  value={menu.name}
                  onChange={updateMenu}
                />
                <label>Price:</label>
                <input
                  type="number"
                  placeholder="Menu Item Price"
                  name="price"
                  value={menu.price}
                  onChange={updateMenu}
                />
                <label>Description:</label>
                <input
                  type="textarea"
                  placeholder="Description"
                  name="des"
                  value={menu.des}
                  onChange={updateMenu}
                />
                <label>Type:</label>
                <input
                  type="textarea"
                  placeholder="Type"
                  name="type"
                  value={menu.type}
                  onChange={updateMenu}
                />
                <input
                  type="file"
                  id="fileinput"
                  name="image"
                  onChange={updateMenu}
                />
                <label id="file-label" htmlFor="fileinput">
                  <i className="fa fa-upload"></i>&emsp;
                  <span id="labell">Choose a Image...</span>&ensp;
                  <span id="nameoffilee"></span>
                </label>
                <br />
              </div>
              <button className="popup_btn save" id={index} onClick={EditMenu}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResMenuCard;
