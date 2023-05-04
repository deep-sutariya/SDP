import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ResMenuCard from "./ResMenuCard";
import "../components/style/allmenu.css";
import "../components/style/popup.css";
import axios from "axios";
import { LoginDetails } from "../contex/Logincontex";
import BounceLoader from "react-spinners/BounceLoader";

const AllMenu = () => {
  const { loginrestaurant } = useContext(LoginDetails);
  const [RestaurantMenu, setRestaurantMenu] = useState([]);

  let [loading, setLoading] = useState(true);

  const [addmenu, setaddmenu] = useState({
    name: "",
    des: "",
    price: "",
    type: "",
    image: "",
  });

  let name, value;
  const updateMenu = (e) => {
    name = e.target.name;
    value = e.target.value;
    if (name === "image") {
      document.getElementById("nameoffile").innerText = e.target.files[0].name;
      document.getElementById("label").innerText = "";
      setaddmenu({ ...addmenu, [name]: e.target.files[0] });
    } else setaddmenu({ ...addmenu, [name]: value });
  };

  const errmag = document.getElementById("addmenuerror");


  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  
  const UploadImage = async () => {
    const formData = new FormData();
    formData.append("file", addmenu.image);
    formData.append("upload_preset", "guydx3xf");
    formData.append("cloud_name", "dt6unpuse");
    const data = await axios.post(
      "https://api.cloudinary.com/v1_1/dt6unpuse/image/upload",
      formData
    );
    return data?.data?.secure_url;
  };

  const saveMenu = async (e) => {
    if (
      addmenu.price &&
      addmenu.des &&
      addmenu.name &&
      addmenu.type &&
      addmenu.image
    ) {
      setLoading(true);

      let image_url = await UploadImage();
      setaddmenu({ ...addmenu, ["image"]: image_url });

      const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/addmenu`, {
        resid: loginrestaurant._id.toString(),
        iname: addmenu.name,
        iprice: addmenu.price,
        ides: addmenu.des,
        itype: addmenu.type,
        iimage: image_url,
      });

      setRestaurantMenu([...RestaurantMenu, addmenu]);


      setShowPopup(false);
      setLoading(false);
    } else {
      errmag.innerText = "Error! : *** Fill All Details ***";
      errmag.style = "color:red;";
    }
  };

  useEffect(() => {
    setLoading(true);
    setRestaurantMenu(loginrestaurant?.rmenu);
    setLoading(false);
  }, [loginrestaurant]);

  return RestaurantMenu ? (
    <div className="res_menus">
      <div>
        <div className="addbutton">
          <button onClick={togglePopup} className="modify_button addmenu">
            Add Menu +
          </button>
        </div>
        {showPopup && (
          <div className="addmenu_popup">
            <div className="popup_info">
              <label>Item Name:</label>
              <input
                type="text"
                placeholder="Menu Item name"
                name="name"
                value={addmenu.name}
                onChange={updateMenu}
              />
              <label>Price:</label>
              <input
                type="number"
                placeholder="Menu Item Price"
                name="price"
                value={addmenu.price}
                onChange={updateMenu}
              />
              <label>Description:</label>
              <input
                type="textarea"
                placeholder="Description"
                name="des"
                value={addmenu.des}
                onChange={updateMenu}
              />
              <label>Type:</label>
              <input
                type="textarea"
                placeholder="Type"
                name="type"
                value={addmenu.type}
                onChange={updateMenu}
              />
              <input
                type="file"
                id="file-input"
                name="image"
                onChange={updateMenu}
              />
              <label id="file-label" htmlFor="file-input">
                <i className="fa fa-upload"></i>&emsp;
                <span id="label">Choose a Image...</span>&ensp;
                <span id="nameoffile"></span>
              </label>
              <br />
            </div>
            <span id="addmenuerror"></span>
            <button className="popup_btn save" onClick={saveMenu}>
              {!loading ? "Save" : "Saving"}
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="loader">
          <BounceLoader
            size={50}
            color="black"
            aria-label="Loading Spinner"
            data-testid="loader"
          />{" "}
        </div>
      ) : (
        <div className="menublock">
          {RestaurantMenu &&
            RestaurantMenu.length > 0 &&
            RestaurantMenu.map(({ _id, name, des, price, type }, index) => {
              return (
                <ResMenuCard
                  key={index}
                  setRestaurantMenu={setRestaurantMenu}
                  id={_id}
                  index={index}
                  name={name}
                  price={price}
                  des={des}
                  type={type}
                />
              );
            })}
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default AllMenu;
