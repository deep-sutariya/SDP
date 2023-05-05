import React from "react";
import "./style/Forgot_pass.css";
import { useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Forgot_Pass = () => {
  const [email, setEmail] = useState();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    console.log(email);
  }, [email]);

  const submitform = async (e) => {
    e.preventDefault();

    const data = axios.post(
      `${process.env.REACT_APP_HOST_IP}/forgot-password`,
      {
        email: email,
      }
    );
    if ((await data).data) {
      setStatus(true);
    }
  };

  return (
    <div className="main_forgot_pass">
      {status ? (
        <>
          <h1>Password Updated</h1>
          <Link to="/login">Login Page</Link>
        </>
      ) : (
        <div className="forgot_pass">
          <h1 className="heading">Forgot Password</h1>
          <form className="forgot_form" onSubmit={submitform}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
              id="email"
            />
            <input type="submit" />
          </form>
        </div>
      )}
    </div>
  );
};

export default Forgot_Pass;
