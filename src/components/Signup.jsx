import React from 'react'
import { useState } from 'react';
import './style/signup.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
var validator = require("email-validator");

function Signup() {

    const navigate = useNavigate();
    const [user, setuser] = useState({
        uemail: "", uname: "", upass: "", uphone: "", ucpass: ""
    });

    async function check(e) {
        e.preventDefault();

        let ps = user.upass;
        let cps = user.ucpass;
        let phone = user.uphone;
        let uemail = user.uemail;
        
        let errmsg = document.getElementById('errmsg');
        
        let isvalid = validator.validate(uemail);

        if (ps === cps && phone.length === 10 && isvalid) {
            try{
                const data = await axios.post('/signup',{
                    uemail : user.uemail, 
                    uname : user.uname, 
                    upass : user.upass, 
                    uphone : user.uphone,
                })
                console.log(data);
                navigate("/login");
                alert(`Hello, ${data.data.uname} You Registered Successfully`);

            }catch(error){
                console.log(error);
            }
        }

        else if(!isvalid){
            errmsg.innerText = "Not Valid Email!";
        }
        else if (phone.length !== 10){
            errmsg.innerText = "Not Valid Phone Number!";
        }
        else if (ps !== cps){
            errmsg.innerText = "Passwords are not maching!";
        }

        errmsg.style.color = 'red';
    }

    let name, value;
    function handleinputs(e){
        name = e.target.name;
        value = e.target.value;
        setuser({ ...user, [name]: value });
        e.preventDefault();
    }

    return(
        <div className='main'>
            <form method='post' action='/' onSubmit={check}>
                <div className="container">

                    <b>Name</b>
                    <input type="text" placeholder="Enter Name" name="uname" id='uname' value={user.uname} onChange={handleinputs} required />

                    <b>Email</b>
                    <input type="text" placeholder="Enter Email" id="uemail" name="uemail" value={user.uemail} onChange={handleinputs} required />

                    <b>Phone</b>
                    <input type="text" placeholder="Enter Phone Number" id="uphone" name="uphone" value={user.uphone} onChange={handleinputs} required />

                    <b>Password</b>
                    <input type="password" placeholder="Enter Password" id="upass" name="upass" value={user.upass} onChange={handleinputs} required />

                    <b>Confirm Password</b>
                    <input type="password" placeholder="Enter Password" id="ucpass" name="ucpass" value={user.ucpass} onChange={handleinputs} required />

                    <a className='regres' href='/registerrestaurant'>Register Restaurent</a>

                    <span id='errmsg'></span>

                    <button type="submit">Sign Up</button>

                </div>
            </form>
        </div>
    )
}

export default Signup;