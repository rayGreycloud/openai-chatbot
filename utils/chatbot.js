const { Configuration, OpenAIApi } = require('openai');
const { openAIKey } = require('../config/keys');

const configuration = new Configuration({
  apiKey: openAIKey
});

const openai = new OpenAIApi(configuration);

const submitPrompt = async (messages, personality) => {
  try {
    // if (!messages || messages.length === 0) {
    //   return null;
    // }

    const temperature =
      personality === 'sarcastic and cynical'
        ? 1.3
        : personality === 'depressed and pessimistic'
        ? 1.4
        : 0.7;

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature,
      max_tokens: 128
    });
    // console.log(completion.data.choices[0]);

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
