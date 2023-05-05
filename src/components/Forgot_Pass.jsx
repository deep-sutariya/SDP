import React from 'react'
import './style/Forgot_pass.css'
import { useRef } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const Forgot_Pass = () => {

    const [email,setEmail] = useState();

    useEffect(()=>{
        console.log(email);
    },[email])

    const submitform = async(e) =>{
        e.preventDefault();
        
        const data = axios.post(`${process.env.REACT_APP_HOST_IP}/forgot-password`,{
            email : email,
        })
        if((await data).data) setEmail("");
    }

    return (
        <div className='main_forgot_pass'>
            <div className='forgot_pass'>
                <h1 className='heading'>Forgot Password</h1>
                <form className='forgot_form' onSubmit={submitform}>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='email' id='email'/>
                    <input type='submit' />
                </form>
            </div>
        </div>
    )
}

export default Forgot_Pass