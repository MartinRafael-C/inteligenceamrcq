import { GEMINI_API_KEY } from '@env';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface ConversationMessage {
  role: 'user' | 'model';
  text: string;
}

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: message
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Error de API: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (data.candidates && data.candidates.length > 0) {
      const text = data.candidates[0].content.parts[0].text;
      return text;
    }
    
    throw new Error('No se recibió respuesta válida de Gemini');
  } catch (error) {
    console.error('Error al comunicarse con Gemini:', error);
    throw error;
  }
};

export const sendConversationToGemini = async (
  conversationHistory: ConversationMessage[]
): Promise<string> => {
  try {
    const contents = conversationHistory.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contents })
    });

    if (!response.ok) {
      throw new Error(`Error de API: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    }
    
    throw new Error('No se recibió respuesta válida de Gemini');
  } catch (error) {
    console.error('Error al comunicarse con Gemini:', error);
    throw error;
  }
};