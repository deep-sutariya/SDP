import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const UserSelectedResContex = createContext(null);

export const UserSelectedResContexProvider = (props) =>{

    const [SelectedRestaurant, setSelectedRestaurant] = useState({});
    const [SelectedRestaurantMenu, setSelectedRestaurantMenu] = useState([]);

    // console.log(SelectedRestaurantMenu);
    const Rescontexvalue = {SelectedRestaurant,SelectedRestaurantMenu,setSelectedRestaurant,setSelectedRestaurantMenu}

    return (
        <UserSelectedResContex.Provider value={Rescontexvalue}>{props.children}</UserSelectedResContex.Provider>
    )

}