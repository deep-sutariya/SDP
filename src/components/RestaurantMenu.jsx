import React from "react";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import Popup from "./popup";
import "./style/restaurantmenu.css";
import BounceLoader from "react-spinners/BounceLoader";
import { UserSelectedResContex } from "../contex/UserSelectedRestaurant";
import { useNavigate } from 'react-router-dom'
import { LoginDetails } from "../contex/Logincontex";
import { useContext } from "react";
import { TrayContex } from "../contex/tray_contex";
import jwt_decode from "jwt-decode";
import axios from "axios";

function RestaurantMenu() {
    const navigate = useNavigate();
  const {
    SelectedRestaurant,
    SelectedRestaurantMenu,
    setSelectedRestaurant,
    setSelectedRestaurantMenu,
  } = useContext(UserSelectedResContex);
  const { loginuser } = useContext(LoginDetails);
  const { setCartItem, cartItem } = useContext(TrayContex);
  const [selectedres, setSelectedres] = useState({});
  const [resdata, setResdata] = useState();
  const [resmenu, setResmenu] = useState();
  let [loading, setLoading] = useState(true);

  const [open, setopen] = useState(false);

  const now = new Date();
  const year = now.getFullYear();
  const month =
    now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
  const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  const hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
  const minute =
    now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();

  const minDateTime = `${year}-${month}-${day}T${hour}:${minute}`;

  const getData = () => {
    setLoading(true);
    if (SelectedRestaurant && SelectedRestaurantMenu) {
      setResdata(SelectedRestaurant);
      setResmenu(SelectedRestaurantMenu);
    }
    setLoading(false);
  };

  const getSelectedRes = async (token) => {
    setLoading(true);
    let decodedTokenRestaurent = jwt_decode(token);
    const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/getrestaurent`, {
      id: decodedTokenRestaurent.id,
    });
    setSelectedres(data);
    setLoading(false);
  };

  const changeopen = () => {
    setopen(!open);
  };

  const booktable = async (e) => {
    e.preventDefault();

    if (sessionStorage.getItem("type") === "user" && loginuser) {
      const noofpeople = e.target[0].value;
      const datetime = e.target[1].value;
      if(noofpeople === "" || datetime === ""){
        alert("Invalid input Plz fill all the details");
      }else{
            const date = datetime.split("T")[0];
            const time = datetime.split("T")[1];
      
            // console.log("-->", date.split('T'))
      
            const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/booktable`, {
              noofpeople,
              time,
              resid: SelectedRestaurant._id,
              userid: loginuser._id
            });
      
            alert(`${data.data}`);
            setopen(!open);
      }
    } else {
      alert("First login Plz !!!!");
      navigate("/login", {
        state: {
          fromCart: true,
        },
      });
    }
  };

  useEffect(() => {
    setSelectedRestaurant(selectedres?.data?.data);
    setSelectedRestaurantMenu(selectedres?.data?.data?.rmenu);
    setResmenu(selectedres?.data?.data?.rmenu); //
    setResdata(selectedres?.data?.data); //
    let size = SelectedRestaurantMenu?.length;
    const cart = Array(size).fill(0);
    setCartItem(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [selectedres]);

  useEffect(() => {
    getSelectedRes(sessionStorage.getItem("selectedrestaurent"));
  }, []);

  return (
    <>
      <div
        style={{
          textAlign: "center",
          marginTop: "60px",
          marginBottom: "50px",
          textDecoration: "underline",
        }}
        className="menuParent"
      >
        <h1>{resdata?.rname.toUpperCase()}</h1>
      </div>

      {/* <h2 style={{textAlign : "center",margin: "20px 0px"}}>Categories</h2> */}
      {/* <Types /> */}

      {/* <h2 style={{textAlign : "center", margin:"40px 0 20px 0"}}>Menu</h2> */}
      <div className="mainresmenu">
        <div className="booktable">
          {open ? (
            <button
              className="popup_button"
              style={{ width: "20%" }}
              onClick={changeopen}
            >
              Close
            </button>
          ) : (
            <button className="popup_button" onClick={changeopen}>
              Book Table
            </button>
          )}

          {open && (
            <form className="form_booktable" onSubmit={booktable}>
              <input
                className="input-field-table"
                type="number"
                min={1}
                max={20}
                placeholder="Number of people"
              />
              <input
                className="input-field-table"
                type="datetime-local"
                min={minDateTime}
                placeholder="Number of people to book table"
              />
              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
          )}
        </div>

        <div className="allmenuitems">
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
            resmenu &&
            Object.keys(resmenu).length > 0 &&
            resmenu.map(({ _id, name, des, price, image }, index) => {
              return (
                <Menu
                  key={index}
                  index={index}
                  id={_id}
                  name={name}
                  des={des}
                  price={price}
                  image={image}
                />
              );
            })
          )}
        </div>
      </div>
      <Popup resmenu={resmenu} />
    </>
  );
}

export default RestaurantMenu;
