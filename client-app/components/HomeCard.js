import React from 'react'
import { View, Image, Text, Button, TouchableOpacity } from 'react-native'

const HomeCard = ({ id, image, name, address, rating, ratingcount }) => {
    return (
        <View className="flex flex-row mx-5 my-3 border border-red-400 bg-slate-200 h-48">
            <View className="w-2/5 h-48">
                <Image className="object-contain w-full h-full" src={image} alt={name + "image"} />
            </View>
            <View className="flex flex-col pt-8 pl-4 leading-normal">
                <Text className="mb-2 text-lg font-bold tracking-tight text-red-900 dark:text-white">{name}</Text>
                <Text className="mb-3 font-normal text-gray-700 dark:text-gray-400">{address}</Text>
                <Text class="mb-3 font-normal text-gray-700 dark:text-gray-400">{rating + " ⭐"}<Text className="font-light">{"(" + ratingcount + ")"}</Text></Text>
            </View>
        </View>

    )
}

export default HomeCard