import { useState } from "react";
import { createContext } from "react";

export const LoginDetails = createContext(null);

export const LoginDetailsProvider = (props) =>{

    const [loginrestaurant, setloginrestaurant] = useState(null);

    const [loginuser, setloginuser] = useState(null);

    const loginvalue = {setloginrestaurant, setloginuser, loginrestaurant, loginuser}

    return(
        <LoginDetails.Provider value={loginvalue}>{props.children}</LoginDetails.Provider>
    )

}