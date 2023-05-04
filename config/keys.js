// App env var/API keys
// load keys from root-level .env file (DO NOT COMMIT FILE)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// export env vars and other non-secret keys
module.exports = {
  openAIKey: process.env.OPEN_AI_KEY
};
