import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import Menu from './Menu';
import axios from 'axios';
const RestaurantHome = () => {

    const location = useLocation();
    const [resData,setResdata] = useState([]);
    const resId = location.state.data._id;

    
    useEffect(() => {
      const getData = async() => {
         const data = await axios.post("/getrestaurent",{
              id : resId
          });
          setResdata(data.data);
          console.log(resData.rmenu);
      }
    
      getData();

    }, [])
    

  return (
    <div>

        {/* navbar id "restaurant" */}
        <h1>{resData.rname.toUpperCase()}</h1>

        {(resData) ? <>

         {   Object.keys(resData.rmenu).length > 0 &&
            resData.rmenu.map(({_id,name,des,price})=>{
                    return (<Menu key={_id} id={_id} name={name} des={des} price={price}/>);
                })
        }

        </> : <h1>dshvdas</h1>}



    </div>
  )
}

export default RestaurantHome
