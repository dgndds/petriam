import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/screens/main/main';
import Login from './src/screens/login/login';
import SignUp from './src/screens/signup/signup';
import InboxScreen from './src/screens/inbox/inboxScreen';
import ProfilePage from './src/screens/profile/profilePage';
import RatingsPage from './src/screens/ratingsPage/RatingsPage';
import Contracts from './src/screens/contracts/Contracts';
import HostPage from './src/screens/hostPage/HostPage';
import ViewContractHost from './src/screens/ViewContractHost/ViewContractHost';
import BecomeHost from './src/screens/BecomeHost/BecomeHost';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListHost from './src/screens/listHost/listHost';
import { Provider } from 'react-redux';
import store from './src/redux/store/configureStore';
import MessagePage from './src/screens/MessagePage/messagePage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store = { store }> 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="InboxScreen" component={InboxScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ListHost" component={ListHost} options={{ headerShown: false }} />
          <Stack.Screen name="MessagePage" component={MessagePage} options={{ headerShown: false }} />
          <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
          <Stack.Screen name="ContractsPage" component={Contracts} options={{ headerShown: false }} />
          <Stack.Screen name="RatingsPage" component={RatingsPage} options={{ headerShown: false }} />
          <Stack.Screen name="HostPage" component={HostPage} options={{ headerShown: false }} />
          <Stack.Screen name="ViewContractHost" component={ViewContractHost} options={{ headerShown: false }} />
          <Stack.Screen name="BecomeHost" component={BecomeHost} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F2F2F2',
  },
});
