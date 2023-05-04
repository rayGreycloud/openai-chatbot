import { useState } from 'react';
import axios from 'axios';

import ChatContainer from 'components/ChatContainer';

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
        <div className='flex flex-col items-center justify-center mb-2'>
          <h1 className='my-8 text-center text-2xl md:text-3xl font-normal text-red'>
            Chatbot
          </h1>
          <div className='w-full'>
            <div className='flex w-full'>
              <input
                type='text'
                name='prompt'
                id='prompt'
                value={prompt}
                onChange={handlePromptChange}
                className='block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                aria-describedby='prompt-description'
              />
              <button
                type='button'
                className='w-24 ml-4 rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400'
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            <p className='mt-2 text-sm text-gray-500' id='prompt-description'>
              Enter a prompt for the chatbot
            </p>
          </div>
        </div>

        <ChatContainer messages={messages} />
      </main>
    </div>
  );
};

export default ChatScreen;
