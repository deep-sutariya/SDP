import React from 'react'
import Order from '../screens/Order'
import Home from '../screens/Home'
import CustomDrawer from "../components/CustomDrawer";
import Reservation from '../screens/Reservation';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Menu from '../screens/Menu';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    const navigation = useNavigation()
    const [userData, setUserData] = useState(null)

    return (
        <Drawer.Navigator useLegacyImplementation={true} drawerContent={(props) => <CustomDrawer userData={userData} setUserData={setUserData}  {...props} />}>
            <Drawer.Screen name="Home">
                {(props) => <Home navigation={navigation} />}
            </Drawer.Screen>

            <Drawer.Screen name="Order">
                {(props) => <Order navigation={navigation} />}
            </Drawer.Screen>

            <Drawer.Screen name="Reservation">
                {(props) => <Reservation navigation={navigation} />}
            </Drawer.Screen>

            <Drawer.Screen name="Login">
                {(props) => <Login navigation={navigation} setUserData={setUserData} />}
            </Drawer.Screen>

            <Drawer.Screen name="Signup">
                {(props) => <Signup navigation={navigation} />}
            </Drawer.Screen>

            <Drawer.Screen name="Menu" options={{
                drawerItemStyle: { display: "none" }
            }}>
                {(props) => <Menu navigation={navigation} />}
            </Drawer.Screen>

        </Drawer.Navigator>
    )
}

export default DrawerNavigator