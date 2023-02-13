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
import jwt_decode from "jwt-decode";
import axios from 'axios';

function RestaurantMenu() {

    const { SelectedRestaurant ,SelectedRestaurantMenu,setSelectedRestaurant,setSelectedRestaurantMenu } = useContext(UserSelectedResContex);
    const { setCartItem ,cartItem } = useContext(TrayContex);
    const [selectedres, setSelectedres] = useState({});
    const [resdata, setResdata] = useState();
    const [resmenu, setResmenu] = useState();
    let [loading, setLoading] = useState(true);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

    const getData = () => {
        setLoading(true);
        if(SelectedRestaurant && SelectedRestaurantMenu){
            console.log(SelectedRestaurantMenu);
            setResdata(SelectedRestaurant);
            setResmenu(SelectedRestaurantMenu);
        }
        setLoading(false);
    }

    const getSelectedRes = async (token) => {

        let decodedTokenRestaurent = jwt_decode(token);
    
        const data = await axios.post(`/getrestaurent`, {
          id : decodedTokenRestaurent.id
        });
    
        setSelectedres(data);
      }


    useEffect(()=>{
        setSelectedRestaurant(selectedres?.data);
        setSelectedRestaurantMenu(selectedres?.data?.rmenu);
        setResmenu(selectedres?.data?.rmenu); //
        setResdata(selectedres?.data); //
        let size = SelectedRestaurantMenu?.length
        const cart = Array(size).fill(0);
        setCartItem(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
      }, [selectedres]);

    
    useEffect(() => {
        getData();
        getSelectedRes(getCookie("selectedrestaurent"));
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
            <Popup resmenu = {resmenu}/>
        </>
    )
}

export default RestaurantMenu