import axios from 'axios'
import React from 'react'
import { View, Image, Text, Button, TouchableOpacity } from 'react-native'
import { getIP } from '../util/getIp'
import { useNavigation } from '@react-navigation/native'


const HomeCard = ({ id, image, name, address, rating, ratingcount }) => {
    const navigation = useNavigation();
    const goToMenu = async (e) => {
        const IP = await getIP();
        console.log(IP);
        const restaurant = await axios.post(`http:/${IP}:5000/getrestaurent`, {
            id,
        })
        navigation.navigate("Menu",{
            restaurant : restaurant?.data?.data,
        });
    }

    return (
        <View className="border border-gray-300 rounded-xl flex flex-row items-center mx-4 my-3 p-3 overflow-hidden bg-transparent" id={id} onTouchEnd={goToMenu} >
            <View className="flex-shrink-0 " >
                <Image className="h-28 w-28 object-cover rounded-xl" source={{ uri: image }} alt={name + " image"} />
            </View>

            <View className="flex-1">
                <View className="ml-4">
                    <Text className="text-lg font-semibold text-dark">{name}</Text>
                    <Text className="mt-1 text-sm text-gray-600">{address}</Text>
                    <Text className="mt-1 text-sm text-gray-600">{rating} ⭐ ({ratingcount})</Text>
                </View>
            </View>
        </View>

    )
}

export default HomeCard