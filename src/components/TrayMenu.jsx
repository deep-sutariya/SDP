import React from 'react'
import { useState } from 'react'
import './style/TrayMenu.css'

const TrayMenu = (props) => {

    const [count, setCount] = useState(0);

    const decre = () => {
        if (count > 0)
            setCount(count - 1);
    }

    return (
        <>
            <div className="menu_card">

                <div className="menu_img"></div>

                <div className="infoGrid">

                    <div className="menu_details">

                        <h3>{props.name.toUpperCase()}</h3>
                        <p className='des'>{props.des}</p>
                        <p>4⭐</p>
                        <h2>{props.price}₹</h2>

                    </div>

                    <div className="traybutton">
                        <button onClick={decre}>-</button>
                        <span className='count'>{count}</span>
                        <button onClick={() => { setCount(count + 1) }}>+</button>
                    </div>
                    
                </div>


            </div>
        </>
    )
}

export default TrayMenu