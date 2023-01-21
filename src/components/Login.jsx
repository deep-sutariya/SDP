import axios from "axios";
import React from "react";
import { useState } from "react";
import "./style/login.css";
import { Link, useNavigate } from "react-router-dom";
import restaurentlogo from '../assets/restaurentlogo.jfif';
import userlogo from '../assets/userlogo.jfif';
import Navbar from '../components/Navbar';
import login from '../assets/login.svg'
import reslogin from '../assets/reslogin.svg'


function Login() {
  var data = {};
  const navigate = useNavigate();
  const [loginoption, setLoginOption] = useState("");

  const [user, setuser] = useState({
    uemail: "",
    upass: "",
  });

  const handleRestaurent = () => {
    setLoginOption("restaurent");
    document.getElementById('use').style.backgroundColor = "white";
    document.getElementById('res').style.backgroundColor = "rgba(72, 126, 219, 0.412)";
  }
  const handleUser = () => {
    setLoginOption("user");
    document.getElementById('res').style.backgroundColor = "white";
    document.getElementById('use').style.backgroundColor = "rgba(72, 126, 219, 0.412)";
  }

  let name, value;
  function change(e) {
    name = e.target.name;
    value = e.target.value;
    setuser({ ...user, [name]: value });
    e.preventDefault();
  }

  async function loginchecker(e) {
    let loginmsg = document.getElementById("loginmsg");
    e.preventDefault();
    if (loginoption === "") {
      loginmsg.innerText = "Error! : *** Select Login Option ***";
      loginmsg.style = 'color:red;';
    }
    else {
      try {
        data = await axios.post(`/${loginoption}login`, {
          uemail: user.uemail,
          upass: user.upass,
        });

        if (data.status === 200) {
          console.log(data.data);

          if (loginoption === "user") { // navigate to the user page 
            navigate("/", {
              state: { data: data.data }
            })
            alert(`Hello ${data.data.uname}, you Logged in successfully.`);
          }
          else { // navigate to the restaurent page 
            navigate("/restaurenthome", {
              state: { data: data.data }
            })
            alert(`Hello ${data.data.rname}, you Logged in successfully.`);
          }

        } else {
          loginmsg.innerText = data.data.message;
          loginmsg.style = 'color:red;';
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <>
      <Navbar type="user"/>
      <div className="container">
        <div className="contai">
          <img src={login} alt="loginimage"/>
          {/* <img src={reslogin} alt="loginimage"/> */}
        </div>
        <div className="form grid_container login">
          <div className="form-content-login">
            <header>Login</header>
            <div className="option">
              <div className="restaurent" id="res" onClick={handleRestaurent}>
                <img className="restaurentlogo" src={restaurentlogo} alt="reslogo" />
                <span>Restaurent</span>
              </div>
              <div className="user" id="use" onClick={handleUser}>
                <img className="userlogo" src={userlogo} alt="userlogo" />
                <span>User</span>
              </div>
            </div>
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
                <Link to="#" className="forgot-pass">
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
        </div>
      </div>
    </>
  );
}

export default Login;

/*

<div className='main'>
                
                <form onSubmit={loginchecker}>
                    <h1 className='heading'>Login</h1>
                    <div className="login_container">
                        <b>Email :</b>
                        <input type="text" placeholder="Enter Username" name="uemail" value={user.uemail} onChange={change} required />

                        <b>Password :</b>
                        <input type="password" placeholder="Enter Password" name="upass" value={user.upass} onChange={change} required />
                        
                            <a href='/registerrestaurant' id='res'>Register Restaurent</a>
                            <a href='/signup'>Sign up</a>

                            <span id='loginmsg'></span>

                        <button type="submit" className='login_btn'>Login</button>
                    </div>
                </form>
            </div>

* */
