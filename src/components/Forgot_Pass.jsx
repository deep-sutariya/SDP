import React from 'react'
import './style/Forgot_pass.css'

const Forgot_Pass = () => {

    const submitform = async(e) =>{
        e.preventDefault();
    }

    return (
        <div className='main_forgot_pass'>
            <div className='forgot_pass'>
                <h1 className='heading'>Forgot Password</h1>
                <form className='forgot_form' onSubmit={submitform}>
                    <input type='email' placeholder='email' id='email'/>
                    <input type='submit' />
                </form>
            </div>
        </div>
    )
}

export default Forgot_Pass