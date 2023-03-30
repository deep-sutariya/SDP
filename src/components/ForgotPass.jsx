import React from 'react'

const ForgotPass = () => {
    return (
        <>
            <div className="form-content-login">
                <header>Forgot Password</header>
            
                <form onSubmit={loginchecker} className="inside_form">
                    <div className="field input-field">
                        <input type="email" placeholder="Email" className="input" name="uemail" value={user.uemail} onChange={change} required />
                    </div>

                    <div className="field input-field">
                        <input
                            type="password"
                            placeholder="Password"
                            className="password"
                            name="upass" value={user.upass} onChange={change} required
                        />
                        <i className="bx bx-hide eye-icon"></i>
                    </div>

                    <div className="form-link">
                        <Link to="/forgot-password" className="forgot-pass">
                            Forgot password?
                        </Link>
                    </div>
                    <span id="loginmsg"></span>
                    <div className="field button-field">
                        <button type="submit">Login</button>
                    </div>
                </form>

                <div className="form-link">
                    <span>
                        Don't have an account? {" "}
                        <Link to="/signup" className="link signup-link">
                            Signup
                        </Link>
                    </span>
                </div>
            </div>
        </>
    )
}

export default ForgotPass