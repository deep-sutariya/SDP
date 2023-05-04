import React from "react";
import { useState } from "react";
import "./style/signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import res_img from "../assets/RestaurantLI.jpg";
import user_img from "../assets/CustomerLI.jpg";
import signup from '../assets/Signup.png'
var validator = require("email-validator");

function Signup({ setNavType }) {
  setNavType("user");

  const navigate = useNavigate();
  const [option, setOption] = useState("user");
  const [user, setuser] = useState({
    uemail: "",
    uname: "",
    upass: "",
    uphone: "",
    ucpass: "",
    rname: "",
    roname: "",
    rphone: "",
    raddress: "",
    remail: "",
    rurl: "",
    rcity: "",
    rpincode: "",
    image: "",
    rpass: "",
    rcpass: "",
    rtable: "",
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
          const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/signup`, {
            uemail: user.uemail,
            uname: user.uname,
            upass: user.upass,
            uphone: user.uphone,
          });
          if (data.status === 202) {
            errmsg.innerText = `${data.data.message}`;
          } else {
            navigate("/login");
            alert(`${data.data.message}`);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (!isvalid) {
        errmsg.innerText = "***Not Valid Email!***";
      } else if (uphone.length !== 10) {
        errmsg.innerText = "***Not Valid Phone Number!***";
      } else if (ups !== ucps) {
        errmsg.innerText = "***Passwords are not maching!***";
      }

      errmsg.style.color = "red";
    } else {
      const valid = validator.validate(user.remail);
      if (!user.rname) {
        errmsg.innerText = "***Enter Restaurant Name***";
      } else if (
        user.rpass === user.rcpass &&
        user.rphone.length === 10 &&
        valid &&
        user.rname &&
        user.rcity &&
        user.rtable > 1 &&
        user.image
      ) {
        errmsg.innerText = "";
        let image_url = await UploadImage();
        console.log(user);
        try {
          const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/registerrestaurant`, {
            rname: user.rname,
            roname: user.roname,
            rphone: user.rphone,
            raddress: user.raddress,
            remail: user.remail,
            rurl: user.rurl,
            rcity: user.rcity,
            rtable: user.rtable,
            rpincode: user.rpincode,
            rimage: image_url,
            rpass: user.rpass,
            rmenu: user.rmenu,
          });
          console.log(data);
          if (data.status === 202) {
            errmsg.innerText = `***${data.data.message}***`;
          } else {
            navigate("/login");
            alert(`${data.data.message}`);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (!valid) {
        errmsg.innerText = "***Not Valid Email!***";
      } else if (user.rphone.length !== 10) {
        errmsg.innerText = "***Not Valid Phone Number!***";
      } else if (user.rcity === null) {
        errmsg.innerText = "***Enter City***";
      } else if (user.rpass !== user.rcpass) {
        errmsg.innerText = "***Passwords are not maching!***";
      } else if (user.rtable < 1) {
        errmsg.innerText = "***Table Number Must Be Greater than 1***";
      }

      errmsg.style.color = "red";
    }
  }

  let name, value;
  function handleinputs(e) {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    if(name === "image"){
        document.getElementById("nameoffile").innerText = e.target.files[0].name; 
        document.getElementById("label").innerText = ""; 
        setuser({ ...user, [name]: e.target.files[0] });
    }else
        setuser({ ...user, [name]: value });
  }

  const UploadImage = async () => {
    const formData = new FormData();
    formData.append("file", user.image);
    formData.append("upload_preset", "guydx3xf");
    formData.append("cloud_name", "dt6unpuse");
    let url = "";
    await axios
      .post("https://api.cloudinary.com/v1_1/dt6unpuse/image/upload", formData)
      .then((res) => {
        url = res.data.secure_url;
      });
    return url;
  };
  
  const handleResOption = () => {
    setOption("restaurant");
    document.getElementById("user").style.backgroundColor = "white";
    document.getElementById("user").style.border = "1px solid black";
    document.getElementById("user").style.boxShadow = "none";
    document.getElementById("restaurant").style.backgroundColor =
      "var(--light)";
    document.getElementById("restaurant").style.border = "1px solid black";
    document.getElementById("restaurant").style.boxShadow =
      "0 0 20px 0px var(--light)";
  };
  const handleUserOption = () => {
    setOption("user");
    document.getElementById("restaurant").style.boxShadow = "none";
    document.getElementById("restaurant").style.backgroundColor = "white";
    document.getElementById("restaurant").style.border = "1px solid black";
    document.getElementById("user").style.backgroundColor = "var(--light)";
    document.getElementById("user").style.border = "1px solid black";
    document.getElementById("user").style.boxShadow =
      "0 0 20px 0px var(--light)";
  };
  // converting the file to the Base64 format
//   function convertToBase64(file) {
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload = () => {
//         resolve(fileReader.result);
//       };
//       fileReader.onerror = (error) => {
//         reject(error);
//       };
//     });
//   }

  return (
    <>
      <div className="signup_main">
        <div className="contai">
          <img src={signup} alt="Signup image" />
        </div>

        <div className="signup">
          <div className="signup_option">
            <div className="signup_ login">
              <div className="inner_res">
                <div className="option_img">
                  <img src={res_img} alt="restaurent_option img" />
                </div>
                <div
                  className="option_heading"
                  onClick={handleResOption}
                  id="restaurant"
                >
                  RESTAURANT
                </div>
              </div>
            </div>
            <div className="signup_">
              <div className="inner_user">
                <div className="option_img">
                  <img src={user_img} alt="restaurent_option img" />
                </div>
                <div
                  className="option_heading"
                  onClick={handleUserOption}
                  id="user"
                >
                  USER
                </div>
              </div>
            </div>
          </div>
          <div className="form-content">
            <form>
              {option === "user" ? (
                <>
                  <div className="field input-field">
                    <input
                      type="text"
                      placeholder="Name"
                      onChange={handleinputs}
                      value={user.uname}
                      name="uname"
                      className="input"
                    />
                  </div>
                  <div className="field input-field">
                    <input
                      type="email"
                      placeholder="Email"
                      onChange={handleinputs}
                      value={user.uemail}
                      name="uemail"
                      className="input"
                    />
                    </div>
                  <div className="field input-field">
                    <input
                      type="text"
                      placeholder="Phone No"
                      onChange={handleinputs}
                      value={user.uphone}
                      name="uphone"
                      className="input"
                    />
                  </div>
                  <div className="field input-field">
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={handleinputs}
                      value={user.upass}
                      name="upass"
                      className="input"
                    />
                  </div>
                  <div className="field input-field">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      onChange={handleinputs}
                      value={user.ucpass}
                      name="ucpass"
                      className="input"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="field input-field">
                    <input
                      type="text"
                      placeholder="Restaurant Name"
                      onChange={handleinputs}
                      value={user.rname}
                      name="rname"
                      className="input"
                    />
                  </div>
                  <div className="field input-field">
                    <input
                      type="text"
                      placeholder="Owner Name"
                      onChange={handleinputs}
                      value={user.roname}
                      name="roname"
                      className="input"
                    />
                  </div>
                  <div className="field input-field">
                    <input
                      type="email"
                      placeholder="Email"
                      onChange={handleinputs}
                      value={user.remail}
                      name="remail"
                      className="input"
                    />
                  </div>
                  <div className="field input-field">
                    <input
                      type="text"
                      placeholder="Phone No"
                      onChange={handleinputs}
                      value={user.rphone}
                      name="rphone"
                      className="input"
                    />
                  </div>
                  <div className="field input-field">
                    <input
                      type="text"
                      placeholder="Address"
                      onChange={handleinputs}
                      value={user.raddress}
                      name="raddress"
                      className="input"
                    />
                  </div>
                  <div className="field input-field">
                    <input
                      type="text"
                      placeholder="City"
                      onChange={handleinputs}
                      value={user.rcity}
                      name="rcity"
                      className="input"
                    />
                  </div>
                  <div className="field input-field">
                    <input
                      type="number"
                      min={1}
                      max={100}
                      placeholder="Number of table"
                      onChange={handleinputs}
                      value={user.rtable}
                      name="rtable"
                      className="input"
                    />
                  </div>
                  <div className="field input-field">
                    <input
                      type="text"
                      placeholder="Pincode"
                      onChange={handleinputs}
                      value={user.rpincode}
                      name="rpincode"
                      className="input"
                    />
                  </div>
                  <div className="field input-field">
                    <input
                      type="text"
                      placeholder="Google Location of the Restaurent Url"
                      onChange={handleinputs}
                      value={user.rurl}
                      name="rurl"
                      className="input"
                    />
                  </div>
                  <div className="field input-field">
                    <input type="file" id="file-input" name="image" onChange={handleinputs} />
                    <label id="file-label" htmlFor="file-input">
                      <i className="fa fa-upload"></i>&emsp;
                      <span id="label">Choose a Image...</span>&ensp;
                      <span id="nameoffile"></span>
                    </label>
                  </div>
                  <div className="field input-field">
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={handleinputs}
                      value={user.rpass}
                      name="rpass"
                      className="input"
                    />
                  </div>
                  <div className="field input-field">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      onChange={handleinputs}
                      value={user.rcpass}
                      name="rcpass"
                      className="input"
                    />
                  </div>
                </>
              )}
            </form>
          </div>
          <span id="errmsg" className="errmsg"></span>
          <div className="field button-field">
            <button type="submit" onClick={checkuser}>
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
