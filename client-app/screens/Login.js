import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, ImageBackground } from "react-native";
import { getIP } from '../util/getIp';
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import BackGroundImage from "../components/BackGroundImage";


const Login = ({ navigation, setUserData }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const IP = await getIP();
    const data = await axios.post(`http://${IP}:5000/userlogin`, {
      uemail: email,
      upass: password
    });

    if (data.status === 200) {
      await AsyncStorage.setItem("userDetails", JSON.stringify(data?.data?.data));
      setUserData(data?.data?.data);
      alert(data.data.message);
      navigation.navigate("Home");
      setEmail("");
      setPassword("");
    } else {
      setMessage(data?.data?.message + " !");
    }
  }

  return (
    <BackGroundImage>
      <View className="flex-1 gap-6 justify-center items-center ">

        <View className="flex-row items-center self-stretch justify-center gap-3 mb-4">
          <Text className="text-4xl font-bold text-gray-800">Login</Text>
          <FontAwesome5 name="user-lock" size={24} color="black" className="animate-spin" />
        </View>

        <View className="w-4/5">
          <TextInput
            className="p-3 bg-offwhite rounded-lg mb-4"
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setMessage("");
            }}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            className="bg-offwhite p-3 rounded-lg mb-4"
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setMessage("");
            }}
            secureTextEntry={true}
          />

          {
            message ?
              <Text className="mb-2 text-red-500">{message}</Text>
              : <></>
          }
        </View>


        <TouchableOpacity className="bg-dark p-3 rounded-lg items-center w-4/5" onPress={handleLogin} >
          <Text className="text-white text-lg font-bold">
            Login <Entypo name="login" size={20} color="white" />{" "}
          </Text>
        </TouchableOpacity>

      </View>
    </BackGroundImage>
  )
}

export default Login