import React from "react";
import Order from "../screens/Order";
import Home from "../screens/Home";
import CustomDrawer from "../components/CustomDrawer";
import Reservation from "../screens/Reservation";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Menu from "../screens/Menu";

import BottomTabBarNavigator from "./BottomTabBarNavigator";

const Drawer = createDrawerNavigator();

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
      <Drawer.Screen name="Homes" component={BottomTabBarNavigator} />
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
