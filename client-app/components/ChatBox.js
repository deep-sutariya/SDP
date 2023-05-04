import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { getIP } from "../util/getIp";

const ChatBox = ({ setMessage, setAllMessage, message, allMessage }) => {
  const [serverMessage, setServerMessage] = useState({
    msg: "",
    from: "server",
  });
  const scrollViewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    setIsLoading(true);

    const IP = await getIP();
    let recommendation = "";
    if (message.msg != "") {
      const msg = message.msg;
      setAllMessage([...allMessage, message]);
      setMessage({ msg: "", from: "user" });

      const recommendedFood = await axios.post(`http://${IP}:5000/py`, {
        food: msg,
      });

      if (recommendedFood.data.message) {
        console.log(recommendedFood.data.message);
        recommendation = recommendedFood.data.message;
      } else {
        recommendation = " Recommended Food Items : \n";
        recommendedFood.data.map(({ food1, food2 }, index) => {
          if (food1) {
            recommendation += food1 + " ,";
          } else if (food2) {
            if (index == recommendedFood.data.length - 1)
              recommendation += food2;
            else recommendation += food2 + " ,";
          }
        });
      }

      setServerMessage({ ...serverMessage, msg: recommendation });
    }else{
      setServerMessage({ ...serverMessage, msg: "Enter Valid Input plz !" });
    }
  };

  useEffect(() => {
    if (isLoading) {
      setAllMessage([...allMessage, serverMessage]);
      setIsLoading(false);
    }
  }, [serverMessage]);
  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [allMessage]);

  return (
    <View
      className="bg-white rounded-xl h-3/5 w-4/5 pt-1 pb-4 bg-gray-100 flex-1 px-4"
      style={style.chatbox}
    >
      <View className="py-1 border-b-2 border-gray-400">
        <Text className="text-xl">
          Food Suggestion <Ionicons name="fast-food" size={22} color="black" />
        </Text>
      </View>
      <ScrollView className="mb-1 flex-1 rounded-lg p-2" ref={scrollViewRef}>
        {allMessage &&
          allMessage.map((message, index) => {
            if (message.from === "user") {
              return (
                <Text
                  key={index}
                  className={`p-2 my-1 ml-auto rounded-tl-xl rounded-b-xl w-[80%] bg-light  ${
                    index === allMessage.length - 1 ? " mb-3 " : ""
                  }`}
                >
                  {message.msg}
                </Text>
              );
            } else
              return (
                <Text
                  key={index}
                  className={`p-2 my-1 rounded-tr-xl rounded-b-xl w-[80%] bg-green ${
                    index == allMessage.length - 1 ? " mb-3 " : ""
                  }`}
                >
                  {message.msg}
                </Text>
              );
          })}
      </ScrollView>

      <View className="flex-row justify-between items-center">
        <TextInput
          className="border border-gray-300 bg-white rounded-lg p-2 w-4/5"
          placeholder="Type your message"
          onChangeText={(text) => setMessage({ msg: text, from: "user" })}
          value={message.msg}
        />
        <TouchableOpacity
          className={`px-3 py-2 rounded-lg ${
            isLoading ? " bg-blue-200 " : " bg-blue-500 "
          } `}
          onPress={sendMessage}
          disabled={isLoading}
        >
          {isLoading == true ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size={29} color="white" />
            </View>
          ) : (
            <Text className="text-white font-bold text-lg">
              <FontAwesome name="send" size={22} color="white" />
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  chatbox: {
    position: "absolute",
    bottom: 130,
    right: 25,
  },
});
export default ChatBox;
