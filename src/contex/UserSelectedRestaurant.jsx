import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const UserSelectedResContex = createContext(null);

export const UserSelectedResContexProvider = (props) =>{

    const [Restaurant, setRestaurant] = useState(null);
    const [RestaurantMenu, setRestaurantMenu] = useState(null);

    const setSelectedRestaurant = (resData) =>{
        setRestaurant({resData})
        const data = resData.rmenu;
        setRestaurantMenu(data);
    }

    const Rescontexvalue = {Restaurant,RestaurantMenu,setSelectedRestaurant}

    return (
        <UserSelectedResContex.Provider value={Rescontexvalue}>{props.children}</UserSelectedResContex.Provider>
    )

}