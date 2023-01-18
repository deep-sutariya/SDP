import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {useLocation } from 'react-router-dom'



function Restaurant() {
    
    const location = useLocation();
    const restaurantid = location.state.id;
    const [resdata,setResdata] = useState({});
    const [resmenu,setResmenu] = useState([]);
    const getData = async () => {


        const data = await axios.post("/getrestaurent",{
            id : restaurantid
        });
        console.log(data);
        setResmenu(data.data.rmenu);
        setResdata(data.data);

    }

    useEffect(()=>{
        getData();
    },[]);

  return (
    <>
    <div><h2>{resdata.rname}</h2></div>
    {console.log(resmenu)}
    {Object.keys(resmenu).length > 0 &&
       resmenu.map(({_id,name,des,price})=>{
            return (<ul key={_id}>
                <li><h3>{name}</h3><br></br>
                <h4>{des}</h4><br></br>
                <h3>{price}</h3></li><br></br><br></br>
            </ul>);
        })
    }
    </>
  )
}

export default Restaurant