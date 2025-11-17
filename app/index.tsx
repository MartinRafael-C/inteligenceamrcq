import { StatusBar } from 'expo-status-bar';
import ChatScreen from '../src/screens/ChatScreen';

export default function Index() {
  return (
    <>
      <StatusBar style="light" />
      <ChatScreen />
    </>
  );
}
