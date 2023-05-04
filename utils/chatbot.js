const { Configuration, OpenAIApi } = require('openai');
const { openAIKey } = require('../config/keys');

const configuration = new Configuration({
  apiKey: openAIKey
});

const openai = new OpenAIApi(configuration);

const submitPrompt = async (messages) => {
  try {
    console.log('Submit Prompt messages: ', messages);
    // if (!messages || messages.length === 0) {
    //   return null;
    // }

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages
    });
    console.log(completion.data.choices[0]);

    if (
      !completion ||
      !completion.data.choices ||
      completion.data.choices.length === 0
    ) {
      console.log('No completion data');
      return null;
    }

    return completion.data.choices[0];
  } catch (error) {
    console.log('Submit Prompt error: ', error);
    return null;
  }
};

module.exports = {
  submitPrompt
};
