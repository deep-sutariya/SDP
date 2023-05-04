import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigator from "./Navigator/AppNavigator";
import { useState } from "react";
import { TouchableOpacity, Image } from "react-native";

import "react-native-gesture-handler";

import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet
} from "react-native";
import ChatBox from "./components/ChatBox";

export default function App() {
  const [showChatBox, setShowChatBox] = useState(false);
  
  const [message, setMessage] = useState({ msg: "",from: "user" });
  const [allMessage,setAllMessage] = useState([]);

  const handleChatBoxClick = () => {
    setShowChatBox(!showChatBox);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#f43241"
          translucent={true}
        />
        <AppNavigator />
      </NavigationContainer>
      {showChatBox && <ChatBox message={message} allMessage={allMessage} setMessage={setMessage} setAllMessage={setAllMessage} />}
      <View className="absolute bottom-10 right-5">
        <TouchableOpacity
          onPress={handleChatBoxClick}
          className="bg-white rounded-bl-3xl rounded-r-3xl px-2 py-2 items-center justify-center absolute bottom-8 right-0"
          style={{
            shadowColor: "black",
            elevation: 5
          }}
        >
          <Image
            source={require("./assets/fv-icon.png")}
            style={{ width: 43, height: 43 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
