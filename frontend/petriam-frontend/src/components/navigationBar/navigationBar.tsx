import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../../screens/login/login';
import SignUp from '../../screens/signup/signup';

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: { backgroundColor: '#D98236' },
    }}>
      <Tab.Screen name="Home" component={Login} />
      <Tab.Screen name="Settings" component={SignUp} />
    </Tab.Navigator>
  );
}
/*
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        zIndex: 3,
        backgroundColor: '#D98236',
      },
      icons: {
        zIndex: 2
      },
      box: {
        width: 130,
        height: 130,
        backgroundColor: '#D98236',
        borderRadius: 50,
        position: 'absolute',
        left: 135,
        bottom: 5,
        zIndex: 1
      }
});
*/