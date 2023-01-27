import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ResMenuCard from "./ResMenuCard";
import '../components/style/allmenu.css'

const AllMenu = () => {
  const [Restaurant, setRestaurant] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const data = JSON.parse(localStorage.getItem("data"));
    setRestaurant(data.rmenu);
    console.log(data.rmenu);
    setLoading(false);
  }, []);

  return (
    <div className="res_menus">
      <div className="addbutton">
        <button className="modify_button addmenu">Add Menu +</button>
      </div>
      {
        Object.keys(Restaurant).length > 0 &&
        Restaurant.map(({ _id, name, des, price },index) => {
          return (<ResMenuCard key={_id} id={_id} index={index} name={name} price={price} des={des} />)
        })
      }

    </div>
  );
};

export default AllMenu;
