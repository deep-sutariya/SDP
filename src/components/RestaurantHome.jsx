import React from "react";
import "../components/style/restauranthome.css";
import { LoginDetails } from "../contex/Logincontex";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
const RestaurantHome = ({setNavType}) => {

  setNavType("restaurant")
  
  // const {setloginrestaurant,setloginuser,loginrestaurant, loginuser} = useContext(LoginDetails);
  // const [first, setFirst] = useState({})
  // // Set Contex 
  // function getCookie(name) {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  // }

  // var data, token, type, decodedToken;
  // function getData(type) {
    
  //   axios.post(`/${type}login`, {
  //     uemail: decodedToken.email,
  //     upass: decodedToken.pass,
  //   }).then((response) => setFirst(response.data))
  //   .catch((err) => console.log(err));
  //   console.log(first);

  // }
  // const update = () => {
  //   if(type === "user"){
  //     console.log("User");
  //     setloginuser(first.data);
  //   }
  //   if(type === "restaurent"){
  //     console.log("restaurent");
  //     setloginrestaurant(first.data);
  //     console.log(loginrestaurant);
  //   }
  // }
  
  // useEffect(() => {
  //   token = getCookie("token");
  //   type = getCookie("type");
  //   if (token && type) {
  //     decodedToken = jwt_decode(token);
  //     getData(type);
  //     update();
  //   }
  // }, [])

  return (
    <>
      <Outlet />  
    </>
  );
};

export default RestaurantHome;
