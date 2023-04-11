import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './Navigator/AppNavigator';

import 'react-native-gesture-handler';

import { SafeAreaView, StatusBar, View, StyleSheet, FlatList} from 'react-native'

export default function App() {



  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#f43241" translucent={true} />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  }
});