import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ResMenuCard from "./ResMenuCard";
import './style/allmenu.css';

const AllMenu = () => {
  const [Restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    setRestaurant(data.rmenu);
    console.log(data.rmenu);
  }, []);

  return (
    <div className="res_menus">

      <div className="buttondiv">
        <button className="additembutton"> Add Item </button>
      </div>

      <div className="allmenu">
        {
          Object.keys(Restaurant).length > 0 &&
          Restaurant.map(({ _id, name, des, price }, index) => {
            console.log(index);
            return (<ResMenuCard key={_id} name={name} price={price} des={des} index={index} />)
          })
        }
      </div>

    </div>
  );
};

export default AllMenu;
