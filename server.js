const express = require('express');
const path = require('path');
const cors = require('cors');

const pkgJSON = require('./package.json');
console.log(`APP: ${pkgJSON.name} v${pkgJSON.version}`);

const app = express();

// Init middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
// app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/chat', require('./routes/api/chat'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client/build')));
  // All routes to build file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Set port for heroku or local
const PORT = process.env.PORT || 5001;

// Start server
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`SERVER: Listening on port ${PORT}`);
});
