import React from 'react'
import { useEffect, useState } from 'react';
import Menu from './Menu'
import Navbar from './Navbar';
import Popup from './popup';
import './style/restaurantmenu.css';
import BounceLoader from "react-spinners/BounceLoader";
import { UserSelectedResContex } from '../contex/UserSelectedRestaurant';
import { useContext } from 'react';
import { TrayContex } from '../contex/tray_contex';

function RestaurantMenu() {

    const { SelectedRestaurant ,SelectedRestaurantMenu } = useContext(UserSelectedResContex);
    // const { cartItem } = useContext(TrayContex);
    const { setCartItem ,cartItem } = useContext(TrayContex);

    const [resdata, setResdata] = useState();
    const [resmenu, setResmenu] = useState();
    let [loading, setLoading] = useState(true);

    const getData = () => {
        setLoading(true);
        if(SelectedRestaurant && SelectedRestaurantMenu){
            console.log(SelectedRestaurantMenu);
            setResdata(SelectedRestaurant);
            setResmenu(SelectedRestaurantMenu);
        }
        setLoading(false);
    }

    useEffect(() => {
        
        const cart = Array(SelectedRestaurantMenu.length).fill(0);
        console.log(cart);
        setCartItem(cart);
        localStorage.setItem("cart", JSON.stringify(cart))
        
    },[SelectedRestaurantMenu])
    
    useEffect(() => {
        getData();
    }, []);

    
    
    return (
        <>
            <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '60px', textDecoration: 'underline' }} className="menuParent"><h2>{resdata?.rname}</h2></div>
            <div className="allmenuitems">
                {loading ?<div className="loader"><BounceLoader
                        size={50}
                        color="black"
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /> </div> : 
                    
                        Object.keys(resmenu).length > 0 &&
                        resmenu.map(({ _id, name, des, price },index) => {
                            return (<Menu key={index} index={index} id={_id} name={name} des={des} price={price} />);
                        })
                }
            </div>
            <Popup/>
        </>
    )
}

export default RestaurantMenu