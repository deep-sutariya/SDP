import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import "../components/style/popup.css"
import TrayMenu from './TrayMenu';
import { TrayContex } from '../contex/tray_contex'
import { LoginDetails } from '../contex/Logincontex';
import { UserSelectedResContex } from '../contex/UserSelectedRestaurant';
import axios from 'axios';

const Popup = (props) => {
    const navigate = useNavigate();
    const { cartItem, getTotalCardAmount } = useContext(TrayContex);

    const {SelectedRestaurant,SelectedRestaurantMenu} = useContext(UserSelectedResContex);

    const { loginuser } = useContext(LoginDetails);

    const resmenu = props.resmenu;

    function openForm() {
        document.getElementById("myForm").style.display = "block";
    }

    function closeForm() {
        document.getElementById("myForm").style.display = "none";
    }
      const getOrder = () => {
        let orderItem = new Array(); 
            let menu = SelectedRestaurantMenu;
            for (const item in cartItem) {
                if (cartItem[item] > 0) {
                    let obj = {
                        itemname : menu[item].name,
                        price : menu[item].price,
                        noOfItem : cartItem[item],
                    };
                    orderItem.push(obj);
                }
            }
            return orderItem;
      }
    const checkAuth = async() =>{
        if(sessionStorage.getItem("type") === "user" && loginuser){
            const total = getTotalCardAmount();
            const order = getOrder();
            const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/saveorder`,{
                userid : loginuser._id,
                orderres : SelectedRestaurant._id,
                order : order,
                ordertotal: total,
            });
            navigate("/orders");
        }else{
            alert("First login Plz !!!!");
            navigate("/login",{
                state: {
                    fromCart: true
                }
            });
        }
    }

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
                            resmenu && Object.keys(resmenu).length > 0 &&
                            resmenu.map(({ _id, name, des, price,image }, index) => {
                                if (cartItem[index] !== 0)
                                    return (<TrayMenu key={index} index={index} id={_id} name={name} des={des} price={price} image={image}/>);
                            })
                        }

                    </div>
                    <div className="popup_buttons">
                        <button type="submit" className="btn confirm" onClick={checkAuth}>Confirm Order</button>
                        <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Popup