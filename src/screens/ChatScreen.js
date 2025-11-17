import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import Message from '../components/Message';
import ChatInput from '../components/ChatInput';
import { sendMessageToGemini } from '../services/geminiService';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente virtual con Gemini AI. ¿En qué puedo ayudarte hoy?',
      isUser: false,
      timestamp: new Date().toISOString(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  // Auto-scroll al final cuando llegan nuevos mensajes
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = async (text) => {
    // Agregar mensaje del usuario
    const userMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Enviar a Gemini AI
      const response = await sendMessageToGemini(text);

      // Agregar respuesta del bot
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error',
        'No se pudo obtener respuesta del asistente. Por favor, intenta nuevamente.',
        [{ text: 'OK' }]
      );
      
      // Mensaje de error
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, tuve un problema al procesar tu mensaje. ¿Puedes intentar de nuevo?',
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    Alert.alert(
      'Limpiar Chat',
      '¿Estás seguro de que quieres borrar toda la conversación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpiar',
          style: 'destructive',
          onPress: () => {
            setMessages([{
              id: '1',
              text: '¡Hola! Soy tu asistente virtual con Gemini AI. ¿En qué puedo ayudarte hoy?',
              isUser: false,
              timestamp: new Date().toISOString(),
            }]);
          }
        }
      ]
    );
  };

  const renderMessage = ({ item }) => (
    <Message message={item} isUser={item.isUser} />
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-blue-500 px-4 py-4 flex-row justify-between items-center">
        <View>
          <Text className="text-white text-xl font-bold">Gemini Chat</Text>
          <Text className="text-blue-100 text-sm">Asistente Virtual</Text>
        </View>
        <TouchableOpacity
          className="bg-blue-600 px-4 py-2 rounded-full"
          onPress={clearChat}
        >
          <Text className="text-white font-semibold">Limpiar</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Lista de mensajes */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          className="flex-1 px-4"
          contentContainerStyle={{ paddingVertical: 16 }}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }}
        />

        {/* Input */}
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;