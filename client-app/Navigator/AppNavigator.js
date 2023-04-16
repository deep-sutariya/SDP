import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Order from '../screens/Order';
import DrawerNavigator from './DrawerNavigator';
import Menu from '../screens/Menu';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  return (
    <Stack.Navigator initialRouteName="Drawer" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="StackHome" component={Home} />
      <Stack.Screen name="StackOrder" component={Order} />
      <Stack.Screen name="Menu" component={Menu} />
    </Stack.Navigator>
  )
}

export default AppNavigator