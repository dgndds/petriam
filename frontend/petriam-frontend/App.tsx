import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/screens/main/main';

export default function App() {
  return (
    <Main />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F2F2F2',
  },
});
