import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { UserSelectedResContex } from './UserSelectedRestaurant';

export const TrayContex = createContext(null);

export const TrayContexProvider = (props) => {

    // const { Restaurant, RestaurantMenu } = useContext(UserSelectedResContex);

    // let rrr = RestaurantMenu
    // console.log(rrr);

    const res = JSON.parse(localStorage.getItem("data"))
    const rrr = res.rmenu;

    const getDefaultCart = () => {
        let cart = {}
        if (rrr) {
            for (let i = 0; i < rrr.length; ++i) {
                cart[i] = 0;
            }
        }
        return cart;
    }

    const [cartItem, setCartItem] = useState(getDefaultCart());

    const addToCart = (ItemId) => {
        setCartItem((prev) => ({ ...prev, [ItemId]: prev[ItemId] + 1 }))
    };

    const removeFromCart = (ItemId) => {
        setCartItem((prev) => ({ ...prev, [ItemId]: prev[ItemId] - 1 }))
    };

    const updateCartItemCount = (newAmount, ItemId) => {
        setCartItem((prev) => ({ ...prev, [ItemId]: newAmount }))
    };

    const getTotalCardAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemindex = rrr[item]
                console.log(itemindex)
                if (itemindex) totalAmount += cartItem[item] * Number(itemindex.price);
            }
        }
        return totalAmount
    };

    const contexvalue = { cartItem, addToCart, removeFromCart, updateCartItemCount, getTotalCardAmount, getDefaultCart }

    return (
        <TrayContex.Provider value={contexvalue}>{props.children}</TrayContex.Provider>
    )
}