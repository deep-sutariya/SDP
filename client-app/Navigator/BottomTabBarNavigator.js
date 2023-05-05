import { View, Text } from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Order from "../screens/Order";
import Reservation from "../screens/Reservation";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { getIP } from "../util/getIp"

const Tab = createBottomTabNavigator();

const BottomTabBarNavigator = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
          position: "absolute",
          bottom: 5,
          shadowColor: "black",
          paddingBottom: 10,
          shadowOffset: { width: 20, height: 20 },
          shadowOpacity: 0.5,
          shadowRadius: 3.5,
          left: 7,
          right: 7,
          elevation: 10,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ size, color, focused }) => {
            if (focused) {
              return <Entypo name="home" size={24} color="black" />;
            } else {
              return <Entypo name="home" size={24} color="grey" />;
            }
          },tabBarActiveTintColor: "black"
        }}
      >
        {(props) => <Home navigation={navigation} />}
      </Tab.Screen>

      <Tab.Screen
        name="Orders"
        options={{
          tabBarIcon: ({ size, color, focused }) => {
            if (focused) {
              return <Ionicons name="fast-food" size={24} color="black" />;
            } else {
              return <Ionicons name="fast-food" size={24} color="grey" />;
            }
          },tabBarActiveTintColor: "black"
        }}
      >
        {(props) => <Order navigation={navigation} />}
      </Tab.Screen>

      <Tab.Screen
        name="Reservations"
        options={{
          tabBarIcon: ({ size, color, focused }) => {
            if (focused) {
              return (
                <FontAwesome5 name="calendar-day" size={24} color="black" />
              );
            } else {
              return (
                <FontAwesome5 name="calendar-day" size={24} color="grey" />
              );
            }
          },tabBarActiveTintColor: "black"
        }}
      >
        {(props) => <Reservation navigation={navigation} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabBarNavigator;
