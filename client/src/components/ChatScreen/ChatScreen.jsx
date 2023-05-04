import { useState } from 'react';
import axios from 'axios';

const ChatScreen = () => {
  const initialPrompt = `You are a conversational chatbot. Your personality is: friendly and helpful`;
  const [messages, setMessages] = useState([
    { role: 'system', content: initialPrompt }
  ]);
  const [prompt, setPrompt] = useState('');

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const submitMessage = async (data) => {
    try {
      console.log('submitting message...: ', data);
      const response = await axios.post('/api/chat', {
        messages: data
      });

      if (!response.data) {
        console.log('no response data');
        return;
      }

      if (!response.data.success) {
        console.log('unsuccessful request');
        return;
      }

      setMessages(response.data.messages);

      console.log('response.data: ', response.data);
      return response.data.success;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    console.log('submitting prompt: ', prompt);
    const message = { role: 'user', content: prompt };

    const messagesData = [...messages, message];

    const result = await submitMessage(messagesData);
    console.log('result: ', result);

    if (result) {
      console.log('setting prompt to empty string');
      setPrompt('');
    }
  };
  return (
    <div className='h-main flex flex-col justify-between items-center'>
      <main className='w-full h-full overflow-y-auto flex flex-col max-w-4xl mx-auto px-2 sm:px-24 pt-2'>
        <div className='flex items-center justify-center mb-2'>
          <h1 className='text-center text-2xl md:text-3xl font-normal text-red'>
            Chatbot
          </h1>

          <input
            value={prompt}
            onChange={handlePromptChange}
            type='text'
            placeholder='Enter prompt'
          />

          <button onClick={handleSubmit}>Submit</button>
        </div>
      </main>
    </div>
  );
};

export default ChatScreen;
