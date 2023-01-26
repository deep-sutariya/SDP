import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import Menu from './Menu'
import Navbar from './Navbar';
import Popup from './Popup';
import './style/restaurantmenu.css';
import BounceLoader from "react-spinners/BounceLoader";
import { UserSelectedResContex } from '../contex/UserSelectedRestaurant';
import { useContext } from 'react';

function RestaurantMenu() {

    const {setSelectedRestaurant} = useContext(UserSelectedResContex);

    const location = useLocation();
    const restaurantid = location.state.id;
    const [resdata, setResdata] = useState({});
    const [resmenu, setResmenu] = useState([]);
    let [loading, setLoading] = useState(true);
    
    const getData = async () => {
        setLoading(true);
        const data = await axios.post("/getrestaurent", {
            id: restaurantid
        });
        setResmenu(data.data.rmenu);
        setResdata(data.data);
        setLoading(false);
    }

    useEffect(()=>setSelectedRestaurant(resdata), [resdata] );
    
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
            {/* {console.log("RMenu Page")} */}
            <Popup resmenu = {resmenu}/>
        </>
    )
}

export default RestaurantMenu