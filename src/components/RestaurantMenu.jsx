import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import Menu from './Menu'
import Navbar from './Navbar';
import Popup from '../components/popup';
import './style/restaurantmenu.css'

function RestaurantMenu() {

    const location = useLocation();
    const restaurantid = location.state.id;
    const [resdata, setResdata] = useState({});
    const [resmenu, setResmenu] = useState([]);

    
    const getData = async () => {
        const data = await axios.post("/getrestaurent", {
            id: restaurantid
        });
        setResmenu(data.data.rmenu);
        setResdata(data.data);
    }

    useEffect(() => {
        getData();
    }, [resdata]);

    return (
        <>
            <Navbar type="user" />
            <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '60px', textDecoration: 'underline' }} className="menuParent"><h2>{resdata.rname}</h2></div>
            <div className="allmenuitems">
                {Object.keys(resmenu).length > 0 &&
                    resmenu.map(({ _id, name, des, price }) => {
                        return (<Menu id={_id} name={name} des={des} price={price} />);
                    })
                }
            </div>
            <Popup />
        </>
    )
}

export default RestaurantMenu