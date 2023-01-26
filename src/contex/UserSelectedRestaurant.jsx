import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react'

export const UserSelectedResContex = createContext(null);

export const UserSelectedResContexProvider = (props) =>{

    const [Restaurant, setRestaurant] = useState({});
    const [RestaurantMenu, setRestaurantMenu] = useState({});

    const setSelectedRestaurant = (resData) =>{
        setRestaurant({resData})
        const data = resData.rmenu;
        setRestaurantMenu({data});
    }
    console.log(RestaurantMenu);

    const Rescontexvalue = {Restaurant,RestaurantMenu,setSelectedRestaurant}

    return (
        <UserSelectedResContex.Provider value={Rescontexvalue}>{props.children}</UserSelectedResContex.Provider>
    )

}