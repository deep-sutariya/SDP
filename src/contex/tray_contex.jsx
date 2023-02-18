import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { UserSelectedResContex } from './UserSelectedRestaurant';

export const TrayContex = createContext(null);

export const TrayContexProvider = (props) => {

    const { SelectedRestaurant, SelectedRestaurantMenu } = useContext(UserSelectedResContex);  
    
    const [cartItem, setCartItem] = useState(null)
    const [rmenu, setrmenu] = useState(null);


    useEffect(() => {
        setrmenu(SelectedRestaurantMenu);
    }, [SelectedRestaurantMenu])
    
    const addToCart = (ItemId) => {
        setCartItem((prev) => ({ ...prev, [ItemId]: prev[ItemId] + 1 }));
    };

    const removeFromCart = (ItemId) => {
        setCartItem((prev) => ({ ...prev, [ItemId]: prev[ItemId] - 1 }))
    };

    const updateCartItemCount = (newAmount, ItemId) => {
            setCartItem((prev) => ({ ...prev, [ItemId]: (Number)(newAmount) }))
    };
    const initializeCart = () => {
        setCartItem(JSON.parse(localStorage.getItem("cart")));
    }



    const getTotalCardAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemindex = rmenu[item]
                if (itemindex) totalAmount += cartItem[item] * Number(itemindex.price);
            }
        }
        return totalAmount;
    };

    const contexvalue = { initializeCart, setCartItem, cartItem, addToCart, removeFromCart, updateCartItemCount, getTotalCardAmount }

    return (
        <TrayContex.Provider value={contexvalue}>{props.children}</TrayContex.Provider>
    )
}