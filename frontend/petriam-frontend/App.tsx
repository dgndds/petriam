import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/screens/main/main';
import Login from './src/screens/login/login'
import SignUp from './src/screens/signup/signup';
import InboxScreen from './src/screens/inbox/inboxScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListHost from './src/screens/listHost/listHost';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="InboxScreen" component={InboxScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ListHost" component={ListHost} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F2F2F2',
  },
});
