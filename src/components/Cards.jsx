import React from 'react'
import { createSearchParams, useNavigate } from "react-router-dom";

const Cards = (props) => {

    
    const navigate = useNavigate();

    const toMenuPage = (e) =>{
        console.log(e.target.id);
        navigate("/restaurent",{
            state : {id : e.target.id}
        });
    }

  return (
    <div id={props.rid} onClick={toMenuPage} style={{cursor:"Pointer"}}>{props.rname}</div>
  )
}

export default Cards

/*
 * 
 *restairent Page
 * 
 * resid 
 *  data fetch
 * complete data fetch
 * 
 * 
 * heading 
 * menu 
 * option ==> map
 * 
 * 
 * 
 * 
 * 
 */