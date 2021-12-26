import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/screens/main/main';
import Login from './src/screens/login/login'
import SignUp from './src/screens/signup/signup';
import InboxScreen from './src/screens/inbox/inboxScreen';
import ListHost from './src/screens/listHost/listHost';
import MessagePage from './src/screens/MessagePage/messagePage';

export default function App() {
  return (
    <MessagePage />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F2F2F2',
  },
});
