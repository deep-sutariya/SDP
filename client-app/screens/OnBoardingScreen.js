import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
const OnBoardingScreen = ({navigation}) => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  return (
    <View
      className="flex-1 justify-evenly items-center"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <Animated.Text
        style={{
          fontSize: 40,
          color: "red",
          marginBottom: 5,
          textAlign: "center",
          fontWeight: "bold",
          letterSpacing: 1,
          transform: [{ scale: scaleAnim }],
        }}
      >
        BookMyMeal <Ionicons name="fast-food" size={50} color="black" />
      </Animated.Text>
      <Image
        style={{ width: "100%", height: "50%", borderRadius: 10 }}
        source={require("../assets/burger1.gif")}
      />
      <View className="p-4">
        <Animated.Text
          style={{
            fontSize: 20,
            color: "#333",
            marginBottom: 10,
            textAlign: "center",
            fontWeight: "bold",
            transform: [{ scale: scaleAnim }],
          }}
        >
          Welcome to our App ❤️!
        </Animated.Text>
        <Animated.Text
          style={{
            fontSize: 15,
            color: "#333",
            opacity: scaleAnim,
          }}
        >
          We're excited to make your dining experience more convenient and
          enjoyable. Browse our menu, place orders, and make reservations with
          ease.
        </Animated.Text>
      </View>
      <TouchableOpacity
        className="bg-dark px-4 py-2 rounded"
        style={{width: "40%"}}
        onPress={() => navigation.navigate("Drawer")}
      >
        <View style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
            }}>
          <Text
            className="text-white text-2xl"
          >
            Visit
          </Text>
          <Text>
            <Ionicons name="enter-outline" size={30} color="white" />
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default OnBoardingScreen;
