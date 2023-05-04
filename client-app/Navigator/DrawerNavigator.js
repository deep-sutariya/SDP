import React from "react";
import Order from "../screens/Order";
import Home from "../screens/Home";
import CustomDrawer from "../components/CustomDrawer";
import Reservation from "../screens/Reservation";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import { View, Text } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Menu from "../screens/Menu";

import BottomTabBarNavigator from "./BottomTabBarNavigator";

const Drawer = createDrawerNavigator();

const CustomHeader = () => {
  return (
    <View style={{ backgroundColor: '#f1f1f1', height: 50, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Custom Header</Text>
    </View>
  );
};

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <CustomHeader />
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      drawerContent={(props) => (
        <CustomDrawer
          userData={userData}
          setUserData={setUserData}
          {...props}
        />
      )}
      screenOptions={{
        drawerAllowFontScaling: true,
        drawerActiveBackgroundColor: "#f0f5f1",
        drawerActiveTintColor: "#669970",
        headerStyle:{
          backgroundColor: "#f2f2f2",
        }
      }}
    >
      <Drawer.Screen name="Homes" options={{
        headerTitle: "BookMyMeal",
        headerTitleStyle:{
          color: "#DF7861",
          fontWeight: "bold",
          letterSpacing: 1
        }
      }} component={BottomTabBarNavigator} />
      <Drawer.Screen name="Login">
        {(props) => <Login navigation={navigation} setUserData={setUserData} />}
      </Drawer.Screen>

      <Drawer.Screen name="Signup">
        {(props) => <Signup navigation={navigation} />}
      </Drawer.Screen>

      <Drawer.Screen
        name="Menu"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      >
        {(props) => <Menu navigation={navigation} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
