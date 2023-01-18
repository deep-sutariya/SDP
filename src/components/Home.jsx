import React from 'react'
import { useEffect ,useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Cards from '../components/Cards';

function Home() {
    const [restaurents,setRestaurents] = useState([]);

    const getData = async ()=>{
        const data = await axios.post("/res");
        setRestaurents(data.data);
        console.log(restaurents);
    }
    useEffect(()=>{
        getData();
    },[]);

    return (
        <>
        <Navbar />
        { Object.keys(restaurents).length > 0 &&
            restaurents.map(({_id,rname,raddress}) => (
                <div key={_id}><Cards 
                    rname = {rname}
                    raddress = {raddress}
                    rid = {_id}
                /></div>
            ))
        }

        </>
    )
}

export default Home