import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import './style/login.css';
import { createSearchParams, useNavigate } from 'react-router-dom';

function Login() {
    var data ={};
    const navigate = useNavigate();

    const [user, setuser] = useState({
        uemail: "", upass: ""
    });

    let name, value;
    function change(e) {
        name = e.target.name;
        value = e.target.value;
        setuser({ ...user, [name]: value });
        e.preventDefault();
    }

    async function loginchecker(e) {
        e.preventDefault();
        try {
            data = await axios.post('/login', {
                uemail: user.uemail,
                upass: user.upass
            });
            if(data.status === 200){
                console.log(data);
                
                navigate({
                    pathname: '/',
                    search: createSearchParams({
                        uemail : data.data.uemail,
                        uname : data.data.uname,
                        uphone : data.data.uphone,
                    }).toString(),
                });

                alert(`Hello ${data.data.uname}, you Logged in successfully.`);
            }else{
                alert(data.data.message);
                console.log(data);
            }
            
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className='main'>
                <form onSubmit={loginchecker}>
                    <div className="container">
                        <b>Email</b>
                        <input type="text" placeholder="Enter Username" name="uemail" value={user.uemail} onChange={change} required />

                        <b>Password</b>
                        <input type="password" placeholder="Enter Password" name="upass" value={user.upass} onChange={change} required />
                        
                            <a href='/registerrestaurant' id='res'>Register Restaurent</a>
                            <a href='/signup'>Sign up</a>

                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;