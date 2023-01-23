import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import Menu from './Menu'
import Navbar from './Navbar';
import Popup from '../components/popup';

function Restaurant() {

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
    }, []);

    return (
        <>
            <Navbar type="restaurant" />
            <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '60px', textDecoration: 'underline' }}><h2>{resdata.rname}</h2></div>
            {Object.keys(resmenu).length > 0 &&
                resmenu.map(({ _id, name, des, price }) => {
                    return (<Menu id={_id} name={name} des={des} price={price} />);
                })
            }
            <Popup />
        </>
    )
}

export default Restaurant