import React from 'react'
import { View,Text, Button } from 'react-native'

const Home = ({ navigation }) => {
  return (
    <View>
        <Text className="text-green-400">User Home Page</Text>
        <Button className="m-10" title="Orders Page" onPress={()=>navigation.navigate('Order')}></Button>
    </View>
  )
}

export default Home