import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Menu from './Menu';
import Navbar from './Navbar';
const RestaurantHome = () => {

    const location = useLocation();
    const [resData,setResdata] = useState();

    useEffect(()=>{
      const getData = async ()=>{
        setResdata(location.state.data);
      }

      getData();

    },[]);

  return (
    <div>

        {/* navbar id "restaurant" */}
        <Navbar type="restaurant" />

        {(resData) ? <>

        <h1 style={{textAlign: 'center',marginTop: '60px', marginBottom: '60px', textDecoration: 'underline'}} >{resData.rname}</h1>
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
