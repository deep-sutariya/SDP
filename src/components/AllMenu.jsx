import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ResMenuCard from "./ResMenuCard";
import BounceLoader from "react-spinners/BounceLoader";

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

      {loading?<div className="loader"><BounceLoader
                        size={50}
                        color="black"
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /> </div> :
        Object.keys(Restaurant).length > 0 &&
        Restaurant.map(({ _id, name, des, price }) => {
          return (<ResMenuCard key={_id} name={name} price={price} des={des} />)
        })
      }

    </div>
  );
};

export default AllMenu;
