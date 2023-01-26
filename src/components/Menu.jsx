import React from 'react'
import '../components/style/menucard.css'
const Menu = (props) => {

  return (
    <>

      <div className="menu_card">

        <div className="menu_img"></div>

        <div className="infoGrid">

          <div className="menu_details">
            <h3>{props.name.toUpperCase()}</h3>
            <p>{props.des}</p>
            <p>4⭐</p>
            <h2>{props.price}₹</h2>
          </div>

          <div className="addtraybutton">
            <button >ADD TO TRAY</button>
          </div>

        </div>

      </div>

    </>
  )
}

export default Menu
