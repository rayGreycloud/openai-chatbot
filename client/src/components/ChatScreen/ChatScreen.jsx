import { useEffect, useState } from 'react';
import axios from 'axios';

import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';

import PersonalitySelector from 'components/PersonalitySelector';
import ChatContainer from 'components/ChatContainer';
import Loader from 'components/Loader';

const ChatScreen = () => {
  const initialPersonality = {
    name: 'Holly',
    personality: 'friendly and helpful'
  };
  const [selected, setSelected] = useState(initialPersonality);
  console.log('selected: ', selected);
  const initialPrompt = `You are a conversational chatbot. Your personality is: ${selected.personality}.`;

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', content: initialPrompt }
  ]);
  console.log('messages: ', messages);

  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    setMessages([{ role: 'system', content: initialPrompt }]);
  }, [initialPrompt, selected]);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const submitMessage = async (messages) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/chat', {
        messages,
        personality: selected.personality
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

      return response.data.success;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    console.log('submitting prompt: ', prompt);
    const message = { role: 'user', content: prompt };

    const updatedMessages = [...messages, message];

    const result = await submitMessage(updatedMessages);

    if (result) {
      console.log('setting prompt to empty string');
      setPrompt('');
    }
  };

  const handleReset = async () => {
    setSelected(initialPersonality);

    setMessages([
      {
        role: 'system',
        content: `You are a conversational chatbot. Your personality is: ${initialPersonality}.`
      }
    ]);

    setPrompt('');
  };

  return (
    <div className='h-main flex flex-col justify-between items-center'>
      <main className='w-full h-full overflow-y-auto flex flex-col max-w-4xl mx-auto px-2 sm:px-24 pt-2'>
        <div className='my-2'>
          <h1 className='my-8 text-2xl font-normal leading-7 text-white'>
            OpenAI Chatbot
          </h1>
          <div className='flex items-end justify-between mb-8'>
            <PersonalitySelector
              selectedPersonality={selected}
              setSelectedPersonality={setSelected}
            />

            <button
              type='button'
              className='inline-flex items-center gap-x-1.5 ml-4 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400'
              onClick={handleReset}
            >
              <XMarkIcon className='-ml-0.5 h-6 w-6' aria-hidden='true' />
              Reset
            </button>
          </div>
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
                className='inline-flex items-center gap-x-1.5 ml-4 rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400'
                onClick={handleSubmit}
              >
                <PaperAirplaneIcon
                  className='-ml-0.5 h-5 w-5'
                  aria-hidden='true'
                />
                Submit
              </button>
            </div>
            <p className='mt-2 text-sm text-gray-400' id='prompt-description'>
              Say something to the chatbot
            </p>
          </div>
        </div>
        {loading && <Loader />}

        <ChatContainer messages={messages} botName={selected.name} />
      </main>
    </div>
  );
};

export default ChatScreen;
