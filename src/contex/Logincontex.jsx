import { useState } from "react";
import { createContext } from "react";

export const LoginDetails = createContext(null);

export const LoginDetailsProvider = (props) =>{

    const [loginrestaurant, setloginrestaurant] = useState({});

    const [loginuser, setloginuser] = useState({});


    console.log("In Contex");

    // if(loginuser !== null)
    //     console.log(loginuser);
    // else
    loginrestaurant && console.log(loginrestaurant);

    const loginvalue = {setloginrestaurant, setloginuser, loginrestaurant, loginuser}

    return(
        <LoginDetails.Provider value={loginvalue}>{props.children}</LoginDetails.Provider>
    )

}