import React from 'react'
import { useNavigate } from "react-router-dom";
import "../components/style/cards.css"
import demo_image from '../assets/RestaurantLI.jpg'
const Cards = (props) => {

    
    const navigate = useNavigate();

    const toMenuPage = (e) =>{
        console.log(e.target.id);
        navigate("/restaurentmenu",{
            state : {id : e.target.id}
        });
    }

  return (

      <div className="res_card">
        <div className="res_img">
            <img src={demo_image} alt={props.rid}/>
        </div>
        <div className="res_details">
          <h2 className='res_heading'>{props.rname.toUpperCase()}</h2>
          <p>{props.raddress}</p>
          <div className='res_btn'><button id={props.rid} onClick={toMenuPage} >VISIT</button></div>
        </div>
      </div>

  )
}

export default Cards