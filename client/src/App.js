import { useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
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
    <div className='App'>
      <header className='App-header'>
        <p>Chatbot</p>
        <input
          value={prompt}
          onChange={handlePromptChange}
          type='text'
          placeholder='Enter prompt'
        />

        <button onClick={handleSubmit}>Submit</button>

        {messages.length > 0 &&
          messages.map((message, idx) => {
            if (idx === 0) return null;

            return (
              <p key={idx}>
                {message.role}: {message.content}
              </p>
            );
          })}
      </header>
    </div>
  );
}

export default App;
