import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";

import UserImage from "../assets/user_logo.png";

import { Entypo } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = (props) => {
  const removeUser = async () => {
    await AsyncStorage.removeItem("userDetails");
    console.log("User Logged Out-->", props?.userData?.uname);
    props.setUserData(null);
    props.navigation.navigate("Login");
  };

  const setData = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("userDetails"));
    props.setUserData(userData);
  };

  useEffect(() => {
    console.log("User Logged In-->", props?.userData?.uname);
  }, [props?.userData?.uname]);

  useEffect(() => {
    setData();
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-column justify-center items-center pt-10 pb-10 ">
        <Image
          source={UserImage}
          style={{ height: 100, width: 100, marginBottom: 10 }}
          className="bg-transparent"
        />
        <View>
          <Text className="text-lg">
            {props?.userData?.uname ? props?.userData?.uname : "Unknown User"}
          </Text>
        </View>
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View>
        <TouchableOpacity
          disabled={props?.userData == null}
          className="p-4 bg-dark rounded-lg m-4"
          onPress={removeUser}
        >
          <View className="flex-row justify-center gap-2 items-center">
            <Text className="text-center text-white text-md font-bold">
              Log Out
            </Text>
            <Entypo name="log-out" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
