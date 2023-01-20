import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import Menu from './Menu'



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
    },[setResmenu]);

  return (
    <>
    <div><h2>{resdata.rname}</h2></div>
    {console.log(resmenu)}
        {Object.keys(resmenu).length > 0 &&
        resmenu.map(({_id,name,des,price})=>{
                return (<Menu id={_id} name={name} des={des} price={price}/>);
            })
        }
    </>
  )
}

export default Restaurant