import React from 'react'
import { ImageBackground, View } from 'react-native'

const BackGroundImage = ({ children }) => {
    return (
        <View>
            <ImageBackground source={require('../assets/background.jpg')} style = {{height : '100%'}} >
                <View className="flex-1 w-full h-full">
                    {children}
                </View>
            </ImageBackground>
        </View>
    )
}

export default BackGroundImage