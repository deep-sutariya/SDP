import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../components/style/profile.css";
const Profile = () => {
  const [resData, setResData] = useState({});
  const [resInfo,setResInfo] = useState({});
  const [flag,setFlag] = useState(true);


  useEffect(() => {
    const data = localStorage.getItem("data");
    setResData(JSON.parse(data));
    setResInfo(JSON.parse(data));
  }, []);




  let name,value;
  function change(e) {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setResData({ ...resData, [name]: value });
  }

  const handleEvent = () => {
    setFlag(!flag);
    doChange();
  };

  const updateData = async (e) => {
    e.preventDefault();
    const data = await axios.post("/updaterestaurant",resData);

    if(data.status === 200){

      localStorage.setItem("data",JSON.stringify(data.data.data));
      console.log(data.data.data);
      setResInfo(data.data.data);
      setFlag(!flag);
      doChange();
      alert(data.data.data.message);
    }else{

      alert(data.data.data.message);

    }


    

  }

  const doChange = () => {
    if(flag){
      document.getElementById('profile_a').style.display = "block";
      document.getElementById('edit_form').style.display = "none";
    }else{
      document.getElementById('profile_a').style.display = "none";
      document.getElementById('edit_form').style.display = "block";
    }
  }

  return (

    
      (flag) ? <div className="profile" id="profile_a">
                <div className="profile_heading">
                  <h1>PROFILE</h1>
                  <span className="material-symbols-outlined" onClick={handleEvent} style={{padding: "10px",borderRadius: "30px"}}>edit_square</span>
                </div>
                <hr />
                <div className="profile_info">
                  <h1 style={{textAlign: "center" ,textDecoration: "underline"}}>{resInfo.rname}</h1>
                  <div className="res_info">
                    <p style={{fontWeight : "bold"}}>Email :</p>
                    <p style={{color: "rgb(69, 69, 69)"}}>{resInfo.remail}</p>
                  </div>
                  <div className="res_info">
                    <p style={{fontWeight : "bold"}}>City :</p>
                    <p style={{color: "rgb(69, 69, 69)"}}>{resInfo.rcity}</p>
                  </div>
                  <div className="res_info">
                    <p style={{fontWeight : "bold"}}>Address :</p>
                    <p style={{color: "rgb(69, 69, 69)"}}>{resInfo.raddress}</p>
                  </div>
                  <div className="res_info">
                    <p style={{fontWeight : "bold"}}>Owner Name :</p>
                    <p style={{color: "rgb(69, 69, 69)"}}>{resInfo.roname}</p>
                  </div>
                  <div className="res_info">
                    <p style={{fontWeight : "bold"}}>Phone No :</p>
                    <p style={{color: "rgb(69, 69, 69)"}}>{resInfo.rphone}</p>
                  </div>
                  <div className="res_info">
                    <p style={{fontWeight : "bold"}}>Location :</p>
                    <a href={resData.rurl}>{resInfo.rurl}</a>
                  </div>
                </div>
              </div> : <div className="edit_container" id="edit_form">
              <h1>Edit 😎</h1>
      <form onSubmit={updateData}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="fname">Restaurant Name</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="fname"
              name="rname"
              placeholder="Restaurant Name"
              onChange={change}
              value={resData.rname}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label htmlFor="country">Owner Name</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="lname"
              name="roname"
              placeholder="Owner Name"
              onChange={change}
              value={resData.roname}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label htmlFor="country">Phone No</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="lname"
              name="rphone"
              placeholder="Phone No"
              onChange={change}
              value={resData.rphone}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label htmlFor="subject">Address</label>
          </div>
          <div className="col-75">
            <textarea
              id="subject"
              name="raddress"
              placeholder="Address of Reaturant"
              onChange={change}
              value={resData.raddress}
              style={{height:"200px"}}
            ></textarea>
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label htmlFor="lname">Email </label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="lname"
              name="remail"
              placeholder="Email"
              readOnly
              onChange={change}
              value={resData.remail}
              style={{background: "var(--offwhite)"}}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label htmlFor="country">City</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="lname"
              name="rcity"
              placeholder="City"
              onChange={change}
              value={resData.rcity}
            />
          </div>
        </div>


        <div className="row">
          <div className="col-25">
            <label htmlFor="country">Location</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="lname"
              name="rurl"
              placeholder="URL of Location of Restaurant"
              onChange={change}
              value={resData.rurl}
            />
          </div>
        </div>
        <div className="row">
          <input style={{margin : "0px 10px",background: "red"}} onClick={handleEvent} type="submit" value="Close" />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Profile;
