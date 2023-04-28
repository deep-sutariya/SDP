import React, { useState } from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { validateEmail } from '../util/Validation';
import { validateName } from '../util/Validation';
import { validatePhoneNo } from '../util/Validation';
import { validatePassword } from '../util/Validation';

import axios from 'axios';
import { IP } from '../util/getIp';
import BackGroundImage from '../components/BackGroundImage';

const Signup = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateEmail(email)) {
      if (validateName(name)) {
        if (validatePhoneNo(phone)) {
          if (validatePassword(password, cpassword)) {
            const IP = getIP();
            const user = await axios.post(`http://${IP}:5000/signup`, {
              uemail: email,
              uname: name,
              uphone: phone,
              upass: password,
            })

            console.log("User-->", user.data);
            alert(user.data.message);

            if (user.status === 200) {
              setEmail("");
              setName("");
              setPhone("");
              setCPassword("");
              setPassword("");
              setMessage("");

              navigation.navigate("Login");
            } else {
              setMessage("Email Already Exists!");
            }


          } else {
            setMessage("Enter Valid Passwords!");
          }
        } else {
          setMessage("Enter Valid Phone Number!");
        }
      } else {
        setMessage("Enter Valid Name");
      }
    } else {
      setMessage("Enter Valid Email!");
    }

  }

  return (
    <BackGroundImage>
      <View className="flex-1 gap-4 justify-center items-center">

        <View className="flex-row items-center self-stretch justify-center gap-3 mb-4">
          <Text className="text-4xl font-bold text-gray-800">Sign up</Text>
          <FontAwesome5 name="address-card" size={24} color="black" className="animate-spin" />
        </View>

        <View className="flex justify-center items-center gap-2 w-full">
          <View className="w-4/5">
            <TextInput
              className="p-3 bg-offwhite rounded-lg mb-4"
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete='email'
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </View>

          <View className="w-4/5">
            <TextInput
              className="p-3 bg-offwhite rounded-lg mb-4"
              placeholder="Name"
              autoCapitalize="words"
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
            />
          </View>

          <View className="w-4/5">
            <TextInput
              className="p-3 bg-offwhite rounded-lg mb-4"
              placeholder="Phone Number"
              autoCapitalize="words"
              keyboardType='phone-pad'
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
              }}
            />
          </View>

          <View className="w-4/5">
            <TextInput
              className="p-3 bg-offwhite rounded-lg mb-4"
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>

          <View className="w-4/5">
            <TextInput
              className="p-3 bg-offwhite rounded-lg mb-4"
              placeholder="Confirm Password"
              autoCapitalize="none"
              secureTextEntry
              value={cpassword}
              onChangeText={(text) => {
                setCPassword(text);
              }}
            />
          </View>
        </View>

        {
          message ?
            <Text className="mb-2 text-red-500">{message}</Text>
            : <></>
        }

        <TouchableOpacity className="bg-dark p-3 rounded-lg items-center w-4/5" onPress={handleSubmit}>
          <Text className="text-white text-lg font-bold">
            Sign Up <Entypo name="login" size={20} color="white" />{" "}
          </Text>
        </TouchableOpacity>

      </View>
    </BackGroundImage>
  )
}

export default Signup