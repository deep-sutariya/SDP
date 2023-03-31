import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native'
import axios from 'axios'
import HomeCard from '../components/HomeCard'

const Home = ({ navigation }) => {

  const [restaurants, setRestaurants] = useState([]);
  const [filteredRes, setfilteredRes] = useState([]);
  let [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const data = await axios.post("http://192.168.146.115:5000/res");
    setRestaurants(data.data);
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <View className='flex flex-1 bg-hero'>
      <TouchableOpacity className="bg-blue-500 rounded-md py-2 px-4 mx-auto" onPress={() => navigation.navigate('Order')}>
        <Text className="text-white font-bold">Orders</Text>
      </TouchableOpacity>

      <Text className="text-green-400">User Home Page</Text>

      <ScrollView className="mt-10">
          {
            Object.keys(restaurants).length > 0 &&
            Object.values(restaurants).map((ele, ind) => {
              return <HomeCard key={ind} id={ele._id} image={ele.rimage} name={ele.rname.toUpperCase()} address={ele.raddress} rating={ele.rating} ratingcount={ele.ratingcount} />
            })
          }
      </ScrollView>

    </View>
  )
}

export default Home