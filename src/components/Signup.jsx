import React from "react";
import { useState } from "react";
import "./style/signup.css";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import res_img from '../assets/RestaurantLI.jpg';
import user_img from '../assets/CustomerLI.jpg';
import Navbar from '../components/Navbar';
var validator = require("email-validator");

function Signup() {
    const navigate = useNavigate();
    const [option, setOption] = useState("user");
    const [user, setuser] = useState({
        uemail: "",
        uname: "",
        upass: "",
        uphone: "",
        ucpass: "",
        rname: "",
        roname: "", rphone: "", raddress: "", remail: "", rurl: "", rcity: "", rpass: "", rcpass: ""
    });

    async function checkuser(e) {
        e.preventDefault();
        let errmsg = document.getElementById("errmsg");
        if (option === "user") {

            let ups = user.upass;
            let ucps = user.ucpass;
            let uphone = user.uphone;
            let uemail = user.uemail;

            let isvalid = validator.validate(uemail);

            if (ups === ucps && uphone.length === 10 && isvalid) {
                try {
                    const data = await axios.post("/signup", {
                        uemail: user.uemail,
                        uname: user.uname,
                        upass: user.upass,
                        uphone: user.uphone,
                    });
                    console.log(data);
                    navigate("/login");
                    alert(`Hello, ${data.data.uname} You Registered Successfully`);
                } catch (error) {
                    console.log(error);
                }
            } else if (!isvalid) {
                errmsg.innerText = "Not Valid Email!";
            } else if (uphone.length !== 10) {
                errmsg.innerText = "Not Valid Phone Number!";
            } else if (ups !== ucps) {
                errmsg.innerText = "Passwords are not maching!";
            }

            errmsg.style.color = "red";
        }
        else {
            const valid = validator.validate(user.remail);
            if (user.rpass === user.rcpass && user.rphone.length === 10 && valid) {
                errmsg.innerText = "";
                try {
                    const data = await axios.post('/registerrestaurant', {
                        rname: user.rname,
                        roname: user.roname,
                        rphone: user.rphone,
                        raddress: user.raddress,
                        remail: user.remail,
                        rurl: user.rurl,
                        rcity: user.rcity,
                        rpass: user.rpass,
                        rmenu: user.rmenu
                    })
                    console.log(data);

                    navigate("/login");
                    alert(`Hello, ${data.data.roname} Your Restaurant ${data.data.rname} Registered Successfully`);

                } catch (error) {
                    console.log(error);
                }
            }
            else if (!valid) {
                errmsg.innerText = "Not Valid Email!";
            }
            else if (user.rphone.length !== 10) {
                errmsg.innerText = "Not Valid Phone Number!";
            }
            else if (user.rpass !== user.rcpass) {
                errmsg.innerText = "Passwords are not maching!";
            }
            errmsg.style.color = 'red';
        }
    }

    let name, value;
    function handleinputs(e) {
        name = e.target.name;
        value = e.target.value;
        console.log(name + " " + value);
        setuser({ ...user, [name]: value });
        e.preventDefault();
    }

    const handleResOption = () => {
        setOption("restaurant");
        document.getElementById('user').style.backgroundColor = "white";
        document.getElementById('user').style.border = "1px solid black";
        document.getElementById('user').style.boxShadow = "none";
        document.getElementById('restaurant').style.backgroundColor = "aliceblue";
        document.getElementById('restaurant').style.border = "2px solid rgb(13, 13, 188)";
        document.getElementById('restaurant').style.boxShadow = "1px 4px 9px 3px rgba(160,160,255,0.54)";
    }
    const handleUserOption = () => {
        setOption("user");
        document.getElementById('restaurant').style.backgroundColor = "white";
        document.getElementById('restaurant').style.border = "1px solid black";
        document.getElementById('restaurant').style.boxShadow = "none";
        document.getElementById('user').style.backgroundColor = "aliceblue";
        document.getElementById('user').style.border = "2px solid rgb(13, 13, 188)";
        document.getElementById('user').style.boxShadow = "1px 4px 9px 3px rgba(160,160,255,0.54)";
    }

    return (
        <>
        <Navbar />
        <div className="signup_main">
            <div className="signup login">
                <div className="signup_option">
                    <div className="signup_">
                        <div className="inner_res">
                            <div className="option_img"><img src={res_img} alt="restaurent_option img" /></div>
                            <div className="option_heading" onClick={handleResOption} id='restaurant'>RESTAURENT</div>
                        </div>
                    </div>
                    <div className="signup_">
                        <div className="inner_user">
                            <div className="option_img"><img src={user_img} alt="restaurent_option img" /></div>
                            <div className="option_heading" onClick={handleUserOption} id='user'>USER</div>
                        </div>
                    </div>
                </div>
                <div className="form-content">
                    <form onSubmit={checkuser}>
                        {option === "user" ? <>
                            <div className="field input-field">
                                <input type="text" placeholder="Name" onChange={handleinputs} value={user.uname} name="uname" className="input" />
                            </div>
                            <div className="field input-field">
                                <input type="email" placeholder="Email" onChange={handleinputs} value={user.uemail} name="uemail" className="input" />
                            </div>
                            <div className="field input-field">
                                <input type="text" placeholder="Phone No" onChange={handleinputs} value={user.uphone} name="uphone" className="input" />
                            </div>
                            <div className="field input-field">
                                <input type="password" placeholder="Password" onChange={handleinputs} value={user.upass} name="upass" className="input" />
                            </div>
                            <div className="field input-field">
                                <input type="password" placeholder="Confirm Password" onChange={handleinputs} value={user.ucpass} name="ucpass" className="input" />
                            </div></>
                            : <>
                                <div className="field input-field">
                                    <input type="text" placeholder="Restaurant Name" onChange={handleinputs} value={user.rname} name="rname" className="input" />
                                </div>
                                <div className="field input-field">
                                    <input type="text" placeholder="Owner Name" onChange={handleinputs} value={user.roname} name="roname" className="input" />
                                </div>
                                <div className="field input-field">
                                    <input type="email" placeholder="Email" onChange={handleinputs} value={user.remail} name="remail" className="input" />
                                </div>
                                <div className="field input-field">
                                    <input type="text" placeholder="Phone No" onChange={handleinputs} value={user.rphone} name="rphone" className="input" />
                                </div>
                                <div className="field input-field">
                                    <input type="text" placeholder="Address" onChange={handleinputs} value={user.raddress} name="raddress" className="input" />
                                </div>
                                <div className="field input-field">
                                    <input type="text" placeholder="City" onChange={handleinputs} value={user.rcity} name="rcity" className="input" />
                                </div>
                                <div className="field input-field">
                                    <input type="text" placeholder="Google Location of the Restaurent Url" onChange={handleinputs} value={user.rurl} name="rurl" className="input" />
                                </div>
                                <div className="field input-field">
                                    <input type="password" placeholder="Password" onChange={handleinputs} value={user.rpass} name="rpass" className="input" />
                                </div>
                                <div className="field input-field">
                                    <input type="password" placeholder="Confirm Password" onChange={handleinputs} value={user.rcpass} name="rcpass" className="input" />
                                </div>
                            </>}
                        <span id="errmsg"></span>
                        <div className="field button-field">
                            <button type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </>
    );
}

export default Signup;