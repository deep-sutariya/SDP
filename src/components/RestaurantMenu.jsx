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

    const { RestaurantMenu ,Restaurant } = useContext(UserSelectedResContex);
    const { cartItem } = useContext(TrayContex);

    const [resdata, setResdata] = useState({});
    const [resmenu, setResmenu] = useState([]);
    let [loading, setLoading] = useState(true);


    const getData = () => {
        setLoading(true);

        setResmenu(RestaurantMenu);
        setResdata(Restaurant);

        console.log(cartItem);

        setLoading(false);
    }

    
    useEffect(() => {
        getData();
    }, []);
    
    
    return (
        <>
            <Navbar type="user" />
            <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '60px', textDecoration: 'underline' }} className="menuParent"><h2>{resdata.rname}</h2></div>
            <div className="allmenuitems">
                {loading ?<div className="loader"><BounceLoader
                        size={50}
                        color="black"
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /> </div>:Object.keys(resmenu).length > 0 &&
                    resmenu.map(({ _id, name, des, price },index) => {
                        return (<Menu key={index} index={index} id={_id} name={name} des={des} price={price} />);
                    })
                }
            </div>
            <Popup resmenu = {resmenu}/>
        </>
    )
}

export default RestaurantMenu