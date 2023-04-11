import React, { useEffect, useState } from 'react'
import { Button, Image, Text, TouchableOpacity, View } from 'react-native'

const MenuCard = ({ index, image, name, type, des, price, cart, setCart, total, setTotal }) => {

    const addToCart = async () => {
        await setCart((prev) => ({ ...prev, [index]: prev[index] + 1 }))
        await setTotal(total + parseInt(price));
    }
    const incrementFunction = async() => {
        console.log("Total--.", total + parseInt(price))
        await setTotal(total + parseInt(price));
        await setCart((prev) => ({ ...prev, [index]: prev[index] + 1 }))
    }
    const decrementFunction = async() => {
        await setTotal(total - parseInt(price));
        await setCart((prev) => ({ ...prev, [index]: prev[index] - 1 }))
    }

    return (
        <View className="border border-gray-300 rounded-xl flex flex-col justify-center items-center my-3 mx-auto p-3 overflow-hidden max-w-xs w-80">
            <View className="h-52 w-full bg-cover bg-center mix-blend-multiply bg-gray-200 rounded-lg shadow-md overflow-hidden">
                <Image
                    source={{ uri: image }}
                    className="h-full w-full object-cover bg-transparent mix-blend-multiply"
                />
            </View>

            <View className="mt-4 mb-2 w-72">
                <View className="mx-4">
                    <Text className="font-bold text-xl text-dark">{name}</Text>
                    <Text className="text-gray-500 mb-2">{type}</Text>
                    <Text className="text-gray-600">{des}</Text>
                    <View className="mt-4 flex flex-row justify-between items-center">
                        <Text className="font-bold text-xl text-green-500">{price}₹</Text>
                        {
                            cart[index] > 0 ?
                                <View className="flex flex-row items-center gap-2">
                                    <TouchableOpacity disabled={cart[index] - 1 < 0} className="bg-light" onPress={decrementFunction}><Text className="text-lg font-bold text-offwhite px-2">-</Text></TouchableOpacity>
                                    <Text className="font-bold">{cart[index]}</Text>
                                    <TouchableOpacity disabled={cart[index] + 1 > 20} className="bg-light" onPress={incrementFunction}><Text className="text-lg font-bold text-offwhite px-2">+</Text></TouchableOpacity>
                                </View>
                                
                                :

                                <TouchableOpacity className="bg-dark rounded-md" onPress={addToCart}><Text className="text-white px-3 py-2">Add to Tray</Text></TouchableOpacity>
                        }

                    </View>
                </View>
            </View>
        </View>

    )
}

export default MenuCard