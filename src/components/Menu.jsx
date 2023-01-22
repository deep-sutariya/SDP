import React from 'react'
import '../components/style/menucard.css'
const Menu = (props) => {
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
                <a href='daksjb'><button>ORDER</button></a>
          </div>

      </div>

    </>
  )
}

export default Menu
