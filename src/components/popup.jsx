import React from 'react'
import "../components/style/popup.css"
import Menu from '../components/Menu'
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
                        <Menu id="Homelander" name="Deep" des="hey iam deep" price="0" />
                        <Menu id="Homelander" name="Deep" des="hey iam deep" price="0" />
                        <Menu id="Homelander" name="Deep" des="hey iam deep" price="0" />
                        <Menu id="Homelander" name="Deep" des="hey iam deep" price="0" />
                        <Menu id="Homelander" name="Deep" des="hey iam deep" price="0" />
                        <Menu id="Homelander" name="Deep" des="hey iam deep" price="0" />
                        <Menu id="Homelander" name="Deep" des="hey iam deep" price="0" />
                        <Menu id="Homelander" name="Deep" des="hey iam deep" price="0" />
                        <Menu id="Homelander" name="Deep" des="hey iam deep" price="0" />
                        <Menu id="Homelander" name="Deep" des="hey iam deep" price="0" />
                        <Menu id="Homelander" name="Deep" des="hey iam deep" price="0" />
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