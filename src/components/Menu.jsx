import React from 'react'
import { useContext } from 'react'
import '../components/style/menucard.css'
import { TrayContex } from '../contex/tray_contex'

const Menu = (props) => {
  
  const { cartItem, addToCart } = useContext(TrayContex);

  const TrayItemAmount = cartItem[props.index];

  return (
    <>

      <div className="menu_card">

        <div className="menu_img"></div>

        <div className="infoGridofMenu">

          <div className="menu_details">
            <h3>{props.name.toUpperCase()}</h3>
            <p>{props.des}</p>
            <p>4⭐</p>
            <h2>{props.price}₹</h2>
          </div>

          <div className="addtraybutton">
            <button onClick={() => addToCart(props.index)}>ADD TO TRAY {TrayItemAmount > 0 && <>({TrayItemAmount})</>}</button>
          </div>

        </div>

      </div>

    </>
  )
}

export default Menu;
