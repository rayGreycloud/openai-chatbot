const express = require('express');

const { getChatResponse } = require('../../controllers/chat');

const router = express.Router();

// @route   POST api/chat
// @desc    Get chat response from OpenAI
// @body  { messages: Array of objects}
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { messages, personality } = req.body;

    const result = await getChatResponse(messages, personality);

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
