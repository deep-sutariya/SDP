import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons'; 

const ChatBox = () => {

  return (
        <View className="bg-white rounded-xl h-3/5 w-4/5 pt-1 px-4 pb-4 flex-1" style={style.chatbox}>
        <View className="py-1">
            <Text className="text-xl" >Food Suggestion <Ionicons name="fast-food" size={22} color="black" /></Text>
        </View>
          <ScrollView className="bg-gray-200 mb-1 flex-1 rounded-lg p-2">
            <Text className="p-2 rounded-tr-md rounded-b-md w-[80%] bg-gray-100" >Message</Text>
          </ScrollView>
          <View className="flex-row justify-between items-center">
            <TextInput
              className="border border-gray-300 rounded-lg p-2 w-4/5"
              placeholder="Type your message"
            />
            <TouchableOpacity
              className="bg-blue-500 px-3 py-2 rounded-lg"
            >
              <Text className="text-white font-bold text-lg"><FontAwesome name="send" size={22} color="white" /></Text>
            </TouchableOpacity>
          </View>
        </View>
  );
}
const style = StyleSheet.create({
    chatbox:{
        position: "absolute",
        bottom: 130,
        right: 25,
    }
})
export default ChatBox;
