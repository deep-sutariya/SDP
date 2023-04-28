import React from "react";
import { View, Text,TouchableOpacity } from "react-native";
import BackGroundImage from "../components/BackGroundImage";
import { useNavigation } from "@react-navigation/native";

const LoginFirst = () => {

  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    navigation.navigate("Signup");
  };

  return (
    
          <View className="flex-1 justify-center items-center">
            <Text className="text-2xl font-bold mb-4">
              Ops ! You need to Login First
            </Text>
            <View className="flex-row justify-evenly w-11/12 ">
              <TouchableOpacity
                className="bg-dark h-12 w-2/5 rounded-lg justify-center items-center mb-4"
                onPress={handleLogin}
              >
                <Text className="text-white text-lg font-medium">Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="border-2 border-dark h-12 w-2/5 rounded-lg justify-center items-center"
                onPress={handleRegister}
              >
                <Text className="text-dark text-lg font-medium">
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
  );
};

export default LoginFirst;
