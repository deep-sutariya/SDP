import React from 'react'
import { useEffect ,useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Types from '../components/Types';
import Cards from '../components/Cards';
// import { useLocation } from 'react-router-dom';
import "../components/style/cards.css"
function Home() {
    const [restaurents,setRestaurents] = useState([]);

    // const location = useLocation();
    // const data = location.state.data;

    const getData = async ()=>{
        const data = await axios.post("/res");
        setRestaurents(data.data);
    }
    useEffect(()=>{
        getData();
    },[setRestaurents]);

    return (
        <>
        <Navbar />
        <h1 style={{textAlign : "center",margin: "40px 0px"}}>Categories</h1>
        <Types />
        <h1 style={{textAlign : "center",margin :"10px 0px"}}>Restaurants</h1>
            <div className="all_cards">
                { Object.keys(restaurents).length > 0 &&
                    restaurents.map(({_id,rname,raddress}) => (
                        <div key={_id}><Cards 
                            rname = {rname}
                            raddress = {raddress}
                            rid = {_id}
                        /></div>
                    ))
                }
            </div>

        </>
    )
}

export default Home