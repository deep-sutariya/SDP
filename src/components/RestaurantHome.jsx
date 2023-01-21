import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import Menu from './Menu';
import axios from 'axios';
const RestaurantHome = () => {

    const location = useLocation();
    const [resData,setResdata] = useState();
    const getData = async () => {
        setResdata(location.state.data);
    }

    useEffect(() => {
    
      getData();

    }, [])
    

  return (
    <div>

        {/* navbar id "restaurant" */}
        {(resData) ? <>

         {   Object.keys(resData.rmenu).length > 0 &&
            resData.rmenu.map(({_id,name,des,price})=>{
                    return (<Menu id={_id} name={name} des={des} price={price}/>);
                })
        }

        </> : <h1>dshvdas</h1>}



    </div>
  )
}

export default RestaurantHome
