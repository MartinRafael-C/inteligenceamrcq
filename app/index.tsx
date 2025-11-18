import { StatusBar } from 'expo-status-bar';
import ChatScreen from '../src/screens/ChatScreen';
import React from 'react';

export default function Index() {
  return (
    <>
      <StatusBar style="light" />
      <ChatScreen />
    </>
  );
}
