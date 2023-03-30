import axios from 'axios';
import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { LoginDetails } from '../contex/Logincontex';
import ReservationCard from './ReservationCard';
import './style/Reservation.css'

const Reservations = () => {

    const [Book, setBook] = useState();

    const { loginrestaurant, loginuser } = useContext(LoginDetails);

    const getData = async (type) => {
        let data;
        if (loginrestaurant?._id) {
            data = await axios.post("getreservations", {
                id: loginrestaurant?._id,
                type: type
            })
        }
        else if (loginuser?._id) {
            data = await axios.post("getreservations", {
                id: loginuser?._id,
                type: type
            })
        }
        setBook(data?.data);
    }

    useEffect(() => {
        let type = sessionStorage.getItem("type");
        if (type) getData(type);
    }, [loginuser])

    useEffect(() => {
        let type = sessionStorage.getItem("type");
        if (type) getData(type);
    }, [loginrestaurant])

    useEffect(() => {
        console.log(Book);
    }, [Book]);

    return (
        <>
            <div
                style={{
                    textAlign: "center",
                    marginTop: "60px",
                    marginBottom: "50px",
                    textDecoration: "underline",
                }}
            >
                <h1>Reservations</h1>
            </div>
            
            <div className='Reservation_main'>
                {
                    loginuser || loginrestaurant ?
                    Book ?
                        Book.map((ele, index) => {
                            return <ReservationCard ele={ele} id={index} />
                        })
                        : <h2>Loading...</h2>
                    : 
                    <h2>Login First...</h2>
                    
                }
            </div>
        </>
    )
}

export default Reservations