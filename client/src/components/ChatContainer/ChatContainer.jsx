import React from 'react';

const ChatContainer = ({ botName, messages }) => {
  return (
    <ul className='divide-y divide-gray-800'>
      {messages.length > 1 &&
        messages.map((message, idx) => {
          if (idx === 0) return null;

          const role = message.role === 'user' ? 'You' : botName;

          return (
            <li key={idx} className='flex justify-between gap-x-6 py-5'>
              <div className='flex gap-x-4'>
                <div className='text-sm font-semibold leading-6 text-white uppercase'>
                  {role}:&nbsp;
                </div>
                <div className='text-sm leading-6 text-white'>
                  {message.content}
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default ChatContainer;
