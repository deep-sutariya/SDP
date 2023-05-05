import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
  Image
} from "react-native";
import axios from "axios";
import HomeCard from "../components/HomeCard";
import BackGroundImage from "../components/BackGroundImage";
import { getIP } from "../util/getIp";
import { FontAwesome5 } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRes, setfilteredRes] = useState([]);
  let [loading, setLoading] = useState(true);

  let [pincode, setPincode] = useState();

  const pincode_input = useRef();

  const getData = async () => {
    setLoading(true);

    const IP = await getIP();
    const data = await axios.post(`http://${IP}:5000/res`);
    
    setRestaurants(data.data);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const search = async () => {
    if (pincode === "") setfilteredRes([]);
    else if (pincode.length === 6) {
      const data = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );

      if (data?.data[0].Status === "Success") {
        setfilteredRes(
          restaurants?.filter((resData) => {
            console.log(resData.rcity.toLowerCase());
            return (
              resData.rcity.toLowerCase() ===
                data?.data[0].PostOffice[0].Block.toLowerCase() ||
              resData.rpincode === data?.data[0].PostOffice[0].Pincode
            );
          })
        );
        Keyboard.dismiss();
        setPincode("");
      } else {
        pincode_input.current.focus();
        setfilteredRes([]);
        setPincode("");
        alert("Our Services for the given PinCode will start soon");
      }
    } else {
      pincode_input.current.focus();
      setfilteredRes([]);
      setPincode("");
      alert("Enter Valid Pincode");
    }
  };

  return (
    <BackGroundImage>
      <View className="flex-1 justify-center items-center pb-14 flex-col">
        <View className="flex-row items-center border rounded-md px-4 py-1 w-[50%] my-4">
          <TextInput
            ref={pincode_input}
            className="flex-1 text-gray-700 font-bold text-lg"
            placeholder="Pincode..."
            value={pincode}
            onChangeText={(pin) => setPincode(pin)}
            keyboardType="numeric"
            maxLength={6}
            onSubmitEditing={search}
            blurOnSubmit={true}
          />
          <TouchableOpacity onPress={search}>
            <FontAwesome5
              name="search"
              size={20}
              color="black"
              className="mr-2 text-gray-500"
            />
          </TouchableOpacity>
        </View>
        {Object.keys(filteredRes).length > 0 ? (
          <Text onPress={search} className="underline ml-auto mr-4">
            Clear Filter
          </Text>
        ) : (
          <></>
        )}
        <ScrollView className="flex-1 w-full">
          {Object.keys(filteredRes).length > 0
            ? Object.values(filteredRes).map((ele, ind) => {
                return (
                  <HomeCard
                    key={ind}
                    id={ele._id}
                    image={ele.rimage}
                    name={ele.rname.toUpperCase()}
                    address={ele.raddress}
                    rating={ele.rating}
                    ratingcount={ele.ratingcount}
                    navigation={navigation}
                  />
                );
              })
            : Object.keys(restaurants).length > 0 &&
              Object.values(restaurants).map((ele, ind) => {
                return (
                  <HomeCard
                    key={ind}
                    id={ele._id}
                    image={ele.rimage}
                    name={ele.rname.toUpperCase()}
                    address={ele.raddress}
                    rating={ele.rating}
                    ratingcount={ele.ratingcount}
                    navigation={navigation}
                  />
                );
              })}
        </ScrollView>
      </View>
    </BackGroundImage>
  );
};

export default Home;
