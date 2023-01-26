import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { UserSelectedResContex } from './UserSelectedRestaurant';

export const TrayContex = createContext(null);

export const TrayContexProvider = (props) => {

    const { Restaurant, RestaurantMenu } = useContext(UserSelectedResContex);
    console.log(Restaurant);    

    const [rmenu, setrmenu] = useState([]);
    useEffect(() => {
        setrmenu(RestaurantMenu)
        getDefaultCart();
    }, [RestaurantMenu,Restaurant])

    const [cartItem, setCartItem] = useState({})
    
    const getDefaultCart = () => {
        let cart = {}

        if (rmenu) {
            for (let i = 0; i < rmenu.length; ++i) {
                cart[i] = 0;
            }
        }
        setCartItem(cart);
    }
    console.log(cartItem)
    
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
                let itemindex = rmenu[item]
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