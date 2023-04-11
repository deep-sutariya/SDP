import React, { useEffect } from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native'
import BackGroundImage from '../components/BackGroundImage'
import axios from 'axios';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '@env'
import { useNavigation } from '@react-navigation/native';
import OrderCard from '../components/OrderCard';

const Order = () => {

  const [user, setUser] = useState();
  const [orderData, setorderData] = useState();
  const [Month, setSelectedMonth] = useState("all");

  const navigation = useNavigation();

  const getOrder = async () => {
    console.log("User->", user?.uemail);
    if (user) {
      const data = await axios.post(`http:/${IP}/getuserorder`, {
        email: user.uemail,
        month: Month
      });
      setorderData(data?.data);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  const getUser = async () => {
    let userData = await JSON.parse(await AsyncStorage.getItem("userDetails"));
    setUser(userData);
  }

  useEffect(() => {
    getOrder();
  }, [user, Month])



  return (
    <BackGroundImage>
      <View>

        {
          user ?
            <View className="flex justify-between gap-6">

              <View className="mt-6 bg-slate-300">
                <Picker
                  selectedValue={Month}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedMonth(itemValue)
                  }>

                  <Picker.Item label={"All"} value={"all"} />
                  <Picker.Item label={"January"} value={"january"} />
                  <Picker.Item label="February" value="february" />
                  <Picker.Item label="March" value="march" />
                  <Picker.Item label="April" value="april" />
                  <Picker.Item label="May" value="may" />
                  <Picker.Item label="June" value="june" />
                  <Picker.Item label="July" value="july" />
                  <Picker.Item label="August" value="august" />
                  <Picker.Item label="September" value="september" />
                  <Picker.Item label="October" value="october" />
                  <Picker.Item label="November" value="november" />
                  <Picker.Item label="December" value="december" />
                </Picker>
              </View>


              <View>
                <ScrollView className="h-[90%]">
                  {
                    orderData && Object.keys(orderData).length > 0 &&
                    Object.values(orderData).map((ele) => {
                      return <OrderCard key={ele.orderid} orderData={ele} />
                    })
                  }
                </ScrollView>
              </View>
            </View>

            :

            <View>
              <Text>Login First</Text>
            </View>
        }


      </View>
    </BackGroundImage>
  )
}

export default Order