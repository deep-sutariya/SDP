import React from 'react'
import Navbar from './Navbar';

const Menu = (props) => {
  return (
    <>
      <div className="res_card" style={{ margin: "40px" }}>
        {/* <div className="res_img">
        <img src={demo_image} alt="image" />
    </div> */}
        <div className="res_details">
          <div style={{ float: "left" }}>
            <h2 className='res_heading'>{props.name.toUpperCase()}</h2>
            <p>{props.des}</p>
          </div>
          <div className="more" style={{ float: "right" }}>
            <p>{props.price}</p>
            <div className="res_btn">
              <button>Add to cart</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Menu
