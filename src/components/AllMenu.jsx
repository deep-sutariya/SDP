import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ResMenuCard from "./ResMenuCard";
import '../components/style/allmenu.css'
import axios from "axios";
import { LoginDetails } from "../contex/Logincontex";
import BounceLoader from "react-spinners/BounceLoader";

const AllMenu = () => {

  const {loginrestaurant} = useContext(LoginDetails);
  const [RestaurantMenu, setRestaurantMenu] = useState([]);

  let [loading, setLoading] = useState(true);

  const handleFile = async (e) => {
    e.preventDefault();
    document.getElementById("nameoffile").innerText = e.target.files[0].name; 
    document.getElementById("label").innerText = ""; 
    const file = e.target.files[0];
    const Base64 = await convertToBase64(file);
    setaddmenu({...addmenu, ["image"] : Base64});
    console.log(addmenu.image);
  }

  // converting the file to the Base64 format
  function convertToBase64(file){

    return new Promise((resolve,reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () =>{
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
      })
  }

  const [addmenu, setaddmenu] = useState({
    name:"",
    des:"",
    price:"",
    type:"",
  });


  let name , value;
  const updateMenu = (e) =>{
    name = e.target.name;
    value = e.target.value;
    setaddmenu({...addmenu, [name] : value});
  }

  const errmag = document.getElementById('addmenuerror');

  const saveMenu = async () =>{
    
    if(addmenu.price && addmenu.des && addmenu.name && addmenu.type){
     
      const data = await axios.post("/addmenu", {
        resid: loginrestaurant._id.toString(),
        iname: addmenu.name,
        iprice: addmenu.price,
        ides: addmenu.des,
        itype: addmenu.type
      })

      setRestaurantMenu({...RestaurantMenu,addmenu});
      console.log(RestaurantMenu);
    }

    else{
      errmag.innerText = "Error! : *** Fill All Details ***";
      errmag.style = 'color:red;';
    }
  }

  useEffect(() => {
      setLoading(true);
      // console.log(loginrestaurant?.data?.rmenu);
      setRestaurantMenu(loginrestaurant?.rmenu);
      setLoading(false);

  },[loginrestaurant]); 

  return (

     (RestaurantMenu) ?
      <div className="res_menus">

        <div className="addbutton">
          <a className="modify_button addmenu" href="#addmenuitem">Add Menu +</a>
        </div>

        {/* Add Menu Pop-up */}

        <div id="addmenuitem" className="overlay">

          <div className="popup">
            <h2>"Add Menu Item</h2>
            <a className="close" href="#">
              &times;
            </a>
            <hr />
            <div className="popup_info">
              <label>Item Name:</label>
              <input type="text" placeholder="Menu Item name" name="name" value={addmenu.name} onChange={updateMenu} />
              <label>Price:</label>
              <input type="number" placeholder="Menu Item Price" name="price" value={addmenu.price} onChange={updateMenu} />
              <label>Description:</label>
              <input type="textarea" placeholder="Description" name="des" value={addmenu.des} onChange={updateMenu} />
              <label>Type:</label>
              <input type="textarea" placeholder="Type" name="type" value={addmenu.type} onChange={updateMenu} />
              <input type="file" id="file-input" onChange={handleFile}/>
              <label id="file-label" htmlFor="file-input"><i className='fa fa-upload'></i>&emsp;<span id="label">Choose a Image...</span>&ensp;<span id="nameoffile"></span></label>
            <br/>
              <span id="addmenuerror"></span>
            </div>
            <a className="popup_btn save" style={{margin:"7px 0px"}} href="" onClick={saveMenu}>Save</a>
          </div>

        </div>
          {(loading) ? <div className="loader"><BounceLoader
                        size={50}
                        color="black"
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /> </div>: 
          <div className="menublock">
                {   (RestaurantMenu && Object.keys(RestaurantMenu).length > 0) && RestaurantMenu.map(({ _id, name, des, price, type }, index) => {
                  
                    return (<ResMenuCard key={index} id={_id} index={index} name={name} price={price} des={des} type={type} />)
                  })
                }
          </div>}
      </div> : <></>
  );
};

export default AllMenu;