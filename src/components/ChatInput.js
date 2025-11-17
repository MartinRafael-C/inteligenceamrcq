import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

const ChatInput = ({ onSend, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <View className="flex-row items-center p-4 bg-white border-t border-gray-200">
      <TextInput
        className="flex-1 bg-gray-100 rounded-full px-4 py-3 mr-2 text-base"
        placeholder="Escribe un mensaje..."
        placeholderTextColor="#9CA3AF"
        value={message}
        onChangeText={setMessage}
        multiline
        maxLength={500}
        editable={!isLoading}
      />
      
      <TouchableOpacity
        className={`rounded-full w-12 h-12 items-center justify-center ${
          message.trim() && !isLoading ? 'bg-blue-500' : 'bg-gray-300'
        }`}
        onPress={handleSend}
        disabled={!message.trim() || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text className="text-white text-xl font-bold">→</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;