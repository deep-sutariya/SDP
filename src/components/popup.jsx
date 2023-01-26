import React from 'react'
import "../components/style/popup.css"
import TrayMenu from './TrayMenu';

const popup = () => {

    function openForm() {
        document.getElementById("myForm").style.display = "block";
    }

    function closeForm() {
        document.getElementById("myForm").style.display = "none";
    }

    return (
        <>
            <button className="open-button" onClick={openForm}>Open Tray</button>

            <div className="form-popup" id="myForm">
                <div className="form-container">
                    <h1>Your Tray</h1>
                    <div className="menulist">
                        <TrayMenu id="Homelander" name="Deep" des="hey iam deepffffffff fffffffffffffffff fffffffff ffff ffffffff ffffff fffffff fffff fffffffffff ffffff ffffff" price="0" />
                        <TrayMenu id="Homelander" name="Deep" des="hey iam deep" price="0" />
                        <TrayMenu id="Homelander" name="Deep" des="hey iam deep" price="0" />
                        <TrayMenu id="Homelander" name="Deep" des="hey iam deep" price="0" />
                        <TrayMenu id="Homelander" name="Deep" des="hey iam deep" price="0" />
                        <TrayMenu id="Homelander" name="Deep" des="hey iam deep" price="0" />
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

export default popup