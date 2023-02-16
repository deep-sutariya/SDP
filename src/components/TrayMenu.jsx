import React from 'react'
import { useState } from 'react'
import './style/TrayMenu.css'
import { TrayContex } from '../contex/tray_contex'
import { useContext } from 'react'
import { useEffect } from 'react'

const TrayMenu = (props) => {

    const {initializeCart,cartItem, addToCart, removeFromCart, updateCartItemCount} = useContext(TrayContex);

    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cartItem));

    }, [cartItem])

    useEffect(()=>{
        initializeCart();
    },[])

    return (
        <>
            <div className="menu_card">

                <div className="menu_img">
                    <img src={props.image} alt="" />
                </div>

                <div className="infoGridofMenu">

                    <div className="menu_details">

                        <h3>{props.name.toUpperCase()}</h3>
                        <p className='des'>{props.des}</p>
                        <p>4⭐</p>
                        <h2>{props.price}₹</h2>

                    </div>

                    <div className="traybutton">
                        <button onClick={() => removeFromCart(props.index)}>-</button>
                        <input type="number" className='count' value={cartItem[props.index]}  onChange={(e) => updateCartItemCount((e.target.value), props.index)} />
                        <button onClick={() => addToCart(props.index)}>+</button>
                    </div>
                    
                </div>


            </div>
        </>
    )
}

export default TrayMenu