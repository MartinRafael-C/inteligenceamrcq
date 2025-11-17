import React from 'react';
import { View, Text } from 'react-native';

interface MessageProps {
  message: {
    id: string;
    text: string;
    timestamp: string;
  };
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isUser }) => {
  return (
    <View className={`mb-4 ${isUser ? 'items-end' : 'items-start'}`}>
      <View 
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser ? 'bg-blue-500' : 'bg-gray-200'
        }`}
      >
        <Text className={`text-base ${isUser ? 'text-white' : 'text-gray-800'}`}>
          {message.text}
        </Text>
        <Text className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {new Date(message.timestamp).toLocaleTimeString('es-EC', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </View>
    </View>
  );
};

export default Message;