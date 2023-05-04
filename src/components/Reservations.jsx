import axios from 'axios';
import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { LoginDetails } from '../contex/Logincontex';
import ReservationCard from './ReservationCard';
import './style/Reservation.css'
import BounceLoader from "react-spinners/BounceLoader";

const Reservations = () => {

    const [Book, setBook] = useState();
    const [loading, setLoading] = useState();

    const { loginrestaurant, loginuser } = useContext(LoginDetails);


    const getData = async (type) => {
        let data;
        setLoading(true);
        if (loginrestaurant?._id) {
            data = await axios.post(`${process.env.REACT_APP_HOST_IP}/getreservations`, {
                id: loginrestaurant?._id,
                type: type
            })
        }
        else if (loginuser?._id) {
            data = await axios.post(`${process.env.REACT_APP_HOST_IP}/getreservations`, {
                id: loginuser?._id,
                type: type
            })
        }
        setLoading(false);
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
                        !loading ?
                            Book &&
                                Book.map((ele, index) => {
                                    return <ReservationCard ele={ele} id={index} />
                                })
                            : <div className="loader"><BounceLoader
                                size={50}
                                color="black"
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> </div>

                        :
                        <h2>Login First...</h2>

                }
            </div>
        </>
    )
}

export default Reservations