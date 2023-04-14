import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import BackGroundImage from '../components/BackGroundImage'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '@env'
import ReservationCard from '../components/ReservationCard';

const Reservation = () => {

    const [Reservation, setReservation] = useState();
    const [user, setUser] = useState();

    const FetchReservations = async () => {
        const u = await JSON.parse(await AsyncStorage.getItem("userDetails"))
        setUser(u);
        if (u) {
            const data = await axios.post(`http://${IP}/getreservations`, {
                id: u?._id,
                type: "user",
            });
            setReservation(data?.data);
        }
    }
    useEffect(() => {
        FetchReservations()
    }, []);

    return (
        <BackGroundImage>
            <View className="mb-4">
                    <Text className="font-extrabold text-3xl text-green mx-auto my-5 underline">
                        Reservations
                    </Text>
                <ScrollView className="h-[88%]">
                    {
                        Reservation && Object.keys(Reservation).length > 0 &&
                        Object.values(Reservation).map((ele, index) => {
                            return <ReservationCard
                                key={index}
                                noofpeople={ele.noofpeople}
                                resaddress={ele.resaddress}
                                reservationtime={ele.reservationtime}
                                resid={ele.resid}
                                resname={ele.resname}
                                resphone={ele.resphone}
                                respincode={ele.respincode}
                            />
                        })
                    }
                </ScrollView>
            </View>
        </BackGroundImage>
    )
}

export default Reservation