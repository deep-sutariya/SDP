import React from 'react'
import { useEffect ,useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Types from '../components/Types';
import Cards from '../components/Cards';
import BounceLoader from "react-spinners/BounceLoader";
import '../components/style/home.css'
import "../components/style/cards.css"
function Home() {
    const [restaurents,setRestaurents] = useState([]);
    let [loading, setLoading] = useState(true);

    const getData = async ()=>{
        setLoading(true);
        const data = await axios.post("/res");
        setRestaurents(data.data);
        setLoading(false);
    }
    useEffect(()=>{
        getData();
    },[]);

    return (
        <>
        <Navbar type="user"/>
        <h1 style={{textAlign : "center",margin: "40px 0px"}}>Categories</h1>
        <Types />
        <h1 style={{textAlign : "center",margin :"10px 0px"}}>Restaurants</h1>
            {loading ?<div className="loader"><BounceLoader
                        size={50}
                        color="black"
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /> </div>:<div className="all_cards">
                { Object.keys(restaurents).length > 0 &&
                    restaurents.map(({_id,rname,raddress}) => (
                        <div key={_id}><Cards 
                            rname = {rname}
                            raddress = {raddress}
                            rid = {_id}
                        /></div>
                    ))
                }
            </div>}

        </>
    )
}

export default Home