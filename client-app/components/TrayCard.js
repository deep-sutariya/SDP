import React from 'react'
import { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native'

const TrayCard = ({ index, id, name, des, price, image, cart, setCart, total, setTotal }) => {
    
    const incrementFunction = async() => {
        await setTotal(total + parseInt(price));
        await setCart((prev) => ({ ...prev, [index]: prev[index] + 1 }))
    }
    const decrementFunction = async() => {
        await setTotal(total - parseInt(price));
        await setCart((prev) => ({ ...prev, [index]: prev[index] - 1 }))
    }

    return (
        <View className="border border-gray-300 rounded-xl flex flex-row items-center mx-4 my-3 p-3 overflow-hidden bg-transparent">
            <View className="flex-shrink-0 " >
                <Image className="h-28 w-28 object-cover rounded-xl" source={{ uri: image }} />
            </View>

            <View className="flex-1">
                <View className="ml-4">
                    <Text className="text-lg font-semibold text-dark">{name}</Text>
                    <Text className="mt-2 text-sm text-gray-600">{"Price : " + price}₹</Text>
                    <View className="flex flex-row justify-between mt-2">
                        <Text className="mt-1 text-base text-gray-600 font-bold">{"Total : " + price * cart[index]}₹</Text>
                        <View className="flex flex-row items-center gap-2">
                            <TouchableOpacity disabled={cart[index] - 1 < 0} className="bg-light" onPress={decrementFunction}><Text className="text-lg font-bold text-offwhite px-2">-</Text></TouchableOpacity>
                            <Text className="font-bold">{cart[index]}</Text>
                            <TouchableOpacity disabled={cart[index] + 1 > 20} className="bg-light" onPress={incrementFunction}><Text className="text-lg font-bold text-offwhite px-2">+</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default TrayCard