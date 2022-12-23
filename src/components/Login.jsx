import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import './style/login.css';
import { useNavigate } from 'react-router-dom';

function Login() {

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
            const data = await axios.post('/login', {
                uemail: user.uemail,
                upass: user.upass
            });
            if(data.status === 200){
                console.log(data);
                navigate('/');
                alert("SucssesFull Loggin");
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

                        <a href='/signup'>Sign up</a>

                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;