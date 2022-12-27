import React from 'react';
import { useState } from 'react';
import "./style/rsignup.css";
import axios from 'axios';


const Rsignup = () => {
    const [Restaurant, setRestaurant] = useState({
        rname: "",
        roname: "", rphone: "", raddress: "", remail: "", rurl: "", rcity: "", rpass: "", rcpass: "", rmenu: []
    });

    async function check(e) {
        e.preventDefault();
            try{
                const data = await axios.post('/registerrestaurant',{
                    rname: Restaurant.rname,
                    roname: Restaurant.roname,
                    rphone: Restaurant.rphone,
                    raddress: Restaurant.raddress,
                    remail: Restaurant.remail,
                    rurl: Restaurant.rurl,
                    rcity: Restaurant.rcity,
                    rpass: Restaurant.rpass,
                    rmenu: Restaurant.rmenu
                })
                console.log(data);
            }catch(error){
                console.log(error);
            }
    }

    let name, value;
    const handleinputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setRestaurant({ ...Restaurant, [name]: value });
    }

    return (
        <div className="rmain">
            <div className="rcontainer">
                <form className='rform' method='post' action='/' onSubmit={check}>

                    <b>Restaurant Name :</b>
                    <input type="text" placeholder="Enter Name" name="rname" id='rname' value={Restaurant.rname} onChange={handleinputs} required />

                    <b>Owner Name :</b>
                    <input type="text" placeholder="Enter Owner Name" name="roname" id='roname' value={Restaurant.roname} onChange={handleinputs} required />

                    <b>Email :</b>
                    <input type="text" placeholder="Enter Email" id="remail" name="remail" value={Restaurant.remail} onChange={handleinputs} required />

                    <b>Phone :</b>
                    <input type="text" placeholder="Enter Phone Number" id="rphone" name="rphone" value={Restaurant.rphone} onChange={handleinputs} required />

                    <b>Address :</b>
                    <input type="password" placeholder="Enter Address" id="raddress" name="raddress" value={Restaurant.raddress} onChange={handleinputs} required />

                    <b>City :</b>
                    <input type="password" placeholder="Enter City" id="rcity" name="rcity" value={Restaurant.rcity} onChange={handleinputs} required />

                    <b>Location URL :</b>
                    <input type="password" placeholder="Enter Location" id="rurl" name="rurl" value={Restaurant.rurl} onChange={handleinputs} required />

                    <b>Password :</b>
                    <input type="password" placeholder="Enter Password" id="rpass" name="rpass" value={Restaurant.rpass} onChange={handleinputs} required />

                    <b>Confirm Password</b>
                    <input type="password" placeholder="Enter Confirm Password" id="rcpass" name="rcpass" value={Restaurant.rcpass} onChange={handleinputs} required />

                    <span id='errmsg'></span>

                    <button type="submit">Sign Up</button>

                </form>
            </div>
        </div>
    )
}

export default Rsignup;