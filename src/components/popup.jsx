import React, { useContext } from 'react'
import "../components/style/popup.css"
import TrayMenu from './TrayMenu';
import { TrayContex } from '../contex/tray_contex'

const Popup = (props) => {

    const { cartItem, getTotalCardAmount } = useContext(TrayContex);

    // console.log(props.resmenu);
    const resmenu = props.resmenu;

    function openForm() {
        document.getElementById("myForm").style.display = "block";
    }

    function closeForm() {
        document.getElementById("myForm").style.display = "none";
    }


    // const getTotalCardAmount = () => {
    //     let totalAmount = 0;
    //     for(const item in cartItem){
    //         if(cartItem[item] > 0){
    //             let itemindex = resmenu[item]
    //             console.log(itemindex)
    //             if(itemindex) totalAmount += cartItem[item] * Number(itemindex.price);
    //         }
    //     }
    //     return totalAmount
    // };


    return (
        <>
            <button className="open-button" onClick={openForm}>Open Tray</button>

            <div className="form-popup" id="myForm">
                <div className="heading">
                    <h1>Your Tray</h1>
                    <h3>Total Amount : <span>{getTotalCardAmount()}</span></h3>
                </div>
                <div className="form-container">
                    <div className="menulist">

                        {
                            Object.keys(resmenu).length > 0 &&
                            resmenu.map(({ _id, name, des, price }, index) => {
                                if (cartItem[index] !== 0)
                                    return (<TrayMenu key={index} index={index} id={_id} name={name} des={des} price={price} />);
                            })
                        }

                    </div>
                    <div className="popup_buttons">
                        <button type="submit" className="btn confirm">Confirm Order</button>
                        <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Popup