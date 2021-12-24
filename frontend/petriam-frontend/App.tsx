import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/login/login'
import SignUp from './src/screens/signup/signup';
import InboxScreen from './src/screens/inbox/inboxScreen';

export default function App() {
  return (
    <InboxScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F2F2F2',
  },
});
