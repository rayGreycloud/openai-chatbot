const express = require('express');

const { getChatResponse } = require('../../controllers/chat');

const router = express.Router();

// @route   POST api/chat
// @desc    Get chat response from OpenAI
// @body  { messages: Array of objects}
// @access  Public
router.post('/', async (req, res) => {
  try {
    const messages = req.body.messages;
    console.log('messages: ', messages);

    const result = await getChatResponse(req.body.messages);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
