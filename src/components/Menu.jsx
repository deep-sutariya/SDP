import React from 'react'
import { useState } from 'react'
import '../components/style/menucard.css'
const Menu = (props) => {


  const [count, setCount] = useState(0);
  const decre = () => {
    if(count > 0)
      setCount(count-1);
  }
  return (
    <>
      
      <div className="menu_card">

          <div className="menu_img">

            {/* <img src={demoimage} alt="menu image" /> */}

          </div>
          <div className="menu_details">
              {/* Heading */}
              <h3>{props.name.toUpperCase()}</h3> 
              {/* descrption */}
              <p>{props.des}</p>
              {/* Ratings */}
              <p>4⭐</p>
              {/* Price */}
              <h2>{props.price}₹</h2>
              {/* Button for order */}
                <button  >ADD TO TRAY</button>
                <button onClick={()=> {setCount(count+1)}}>+</button>
                <button>{count}</button>
                <button onClick={decre}>-</button>
          </div>

      </div>

    </>
  )
}

export default Menu
