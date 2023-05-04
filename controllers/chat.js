const { submitPrompt } = require('../utils/chatbot');

const getChatResponse = async (messages = 'messages') => {
  try {
    console.log('messages: ', messages);
    const response = await submitPrompt(messages);

    if (!response) {
      return {
        success: false,
        message: 'Chatbot had no response to your prompt.'
      };
    }
    console.log('response: ', response);

    messages.push(response.message);

    return {
      success: true,
      messages
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Get Chat Response error'
    };
  }
};

module.exports = {
  getChatResponse
};
