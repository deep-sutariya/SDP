import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { LoginDetails } from "../contex/Logincontex";
import { useContext } from "react";
import "../components/style/profile.css";
const Profile = () => {
  const [resData, setResData] = useState({});
  const [resInfo, setResInfo] = useState({});
  const [flag, setFlag] = useState(true);
  const [submiting, setSubmiting] = useState(false);
  const { loginrestaurant } = useContext(LoginDetails);

  const [loading, setloading] = useState(false);

  // const [userData, setUserData] = useState({
  //   labels: Data.map((data) => data.year),
  //   datasets: [
  //     {
  //       label: "Sales",
  //       data: Data.map((data) => data.sales),
  //       borderColor: "green",
  //       backgroundColor: "rgba(39, 245, 57, 0.24)",
  //       fill: true,
  //       tension: 0.4,
  //     },
  //     {
  //       label: "Prediction",
  //       borderColor: "blue",
  //       backgroundColor: "rgba(0, 21, 255, 0.37)",
  //       borderWidth: 1,
  //       data: [
  //         12000, 15500, 11500, 13500, 12500, 11500, 12500, 12500, 10500, 12000,
  //       ],
  //       fill: true,
  //       tension: 0.5,
  //     },
  //   ],
  // });

  const UploadImage = async (e) => {
    const formData = new FormData();
    if (resData.rimage !== "") {
      formData.append("file", resData.rimage);
      formData.append("upload_preset", "guydx3xf");
      formData.append("cloud_name", "dt6unpuse");
      let url = "";
      await axios
        .post(
          "https://api.cloudinary.com/v1_1/dt6unpuse/image/upload",
          formData
        )
        .then((res) => {
          url = res.data.secure_url;
        });
      return url;
    } else {
      return resInfo.rimage;
    }
  };

  useEffect(() => {
    setloading(true);
    setResData({ ...loginrestaurant, ["rimage"]: "" });
    setResInfo(loginrestaurant);
    setloading(false);
  }, [loginrestaurant]);

  let name, value;
  function change(e) {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    if (name === "rimage") {
      setResData({ ...resData, [name]: e.target.files[0] });
      document.getElementById("rnameoffile").innerText = e.target.files[0].name;
      document.getElementById("rlabel").innerText = "";
    } else setResData({ ...resData, [name]: value });
  }

  const handleEvent = () => {
    setFlag(!flag);
  };

  const updateData = async (e) => {
    e.preventDefault();
    setSubmiting(true);
    let image_url = await UploadImage();
    setResData({ ...resData, ["rimage"]: image_url });
    const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/updaterestaurant`, {
      rname: resData.rname,
      roname: resData.roname,
      rphone: resData.rphone,
      raddress: resData.raddress,
      remail: resData.remail,
      rurl: resData.rurl,
      rcity: resData.rcity,
      rimage: image_url,
      rpass: resData.rpass,
      rmenu: resData.rmenu,
      rtableno: resData.rtableno
    });
    console.log(data);
    if (data.status === 200) {
      console.log("200");
      console.log("200");
      setResInfo(data.data.data);
      alert(data.data.message);
    } else {
      console.log("400");
      alert(data.data.message);
    }
    setFlag(!flag);
    setSubmiting(false);
  };

  return (
    <>
      {!loading && resData && resInfo ? (
        flag ? (
          <>
            <div className="profile" id="profile_a" style={{}}>
              <div className="profile_heading">
                <h1>PROFILE</h1>
                <span
                  className="material-symbols-outlined"
                  onClick={handleEvent}
                  style={{ padding: "10px", borderRadius: "30px" }}
                >
                  edit_square
                </span>
              </div>
              <hr />
              <div className="profile_info">
                <div className="imgname">
                  <div className="profile_image">
                    <img src={resInfo.rimage} alt="image" />
                  </div>
                  <div className="profile_header_details">
                    <h1>{resInfo.rname}</h1>
                    <p>{resInfo.roname}</p>
                    <p>{resInfo.remail}</p>
                    <p>{resInfo.rphone}</p>
                    <p
                      style={{
                        fontWeight: "bolder",
                        color: "green",
                        fontSize: "larger",
                        letterSpacing: "0px",
                      }}
                    >
                      {resInfo.rating + " ⭐"}
                    </p>
                  </div>
                  <u></u>
                </div>
                <div className="res_info">
                  <p style={{ fontWeight: "bold" }}>City :</p>
                  <p style={{ color: "rgb(69, 69, 69)" }}>{resInfo.rcity}</p>
                </div>
                <div className="res_info">
                  <p style={{ fontWeight: "bold" }}>Address :</p>
                  <p style={{ color: "rgb(69, 69, 69)" }}>{resInfo.raddress}</p>
                </div>
                <div className="res_info">
                  <p style={{ fontWeight: "bold" }}>Pincode :</p>
                  <p style={{ color: "rgb(69, 69, 69)" }}>{resInfo.rpincode}</p>
                </div>
                <div className="res_info">
                  <p style={{ fontWeight: "bold" }}>No of Table :</p>
                  <p style={{ color: "rgb(69, 69, 69)" }}>{resInfo.rtableno}</p>
                </div>
                <div className="res_info">
                  <p style={{ fontWeight: "bold" }}>Owner Name :</p>
                  <p style={{ color: "rgb(69, 69, 69)" }}>{resInfo.roname}</p>
                </div>
                <div className="res_info">
                  <p style={{ fontWeight: "bold" }}>Location :</p>
                  <a href={resInfo.rurl}>{resInfo.rurl}</a>
                </div>
              </div>
            </div>

            {/* ***Chart**** */}

            {/* <p
              style={{
                width: "80vw",
                margin: "auto",
                textAlign: "center",
                fontFamily: "cursive",
                fontWeight: "bolder",
                fontSize: "3rem",
                letterSpacing: "1px",
              }}
            >
              Statistics
            </p>
            <div className="statistics">
              <Line data={userData} />
            </div> */}
          </>
        ) : (
          <div className="edit_container" id="edit_form">
            <h1>Edit </h1>
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
                    style={{ height: "200px" }}
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
                    style={{ background: "var(--offwhite)" }}
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
                  <label htmlFor="country">No. of tables</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    id="lname"
                    name="rtableno"
                    placeholder="Number of table"
                    onChange={change}
                    value={resData.rtableno}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-25">
                  <label htmlFor="country">Image</label>
                </div>
                <div className="col-75">
                  <input
                    type="file"
                    id="file-input"
                    name="rimage"
                    onChange={change}
                  />
                  <label id="file-label" htmlFor="file-input">
                    <i className="fa fa-upload"></i>&emsp;
                    <span id="rlabel">Choose a Image...</span>&ensp;
                    <span id="rnameoffile"></span>
                  </label>
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
                <input
                  style={{ margin: "0px 10px", background: "red" }}
                  onClick={handleEvent}
                  type="submit"
                  value="Close"
                />
                <input
                  type="submit"
                  value={submiting ? "Submitting..." : "Submit"}
                />
              </div>
            </form>
          </div>
        )
      ) : (
        <>Loding .....</>
      )}
    </>
  );
};

export default Profile;
