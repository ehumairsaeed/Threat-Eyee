const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const groqService = require('./groqService'); // Import your groqService for the analysis logic

dotenv.config(); // Load .env variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware to enable CORS and parse JSON
app.use(cors()); // Enable CORS for all incoming requests
app.use(express.json()); // Parse incoming JSON requests from frontend

// Root route (for basic health check or server confirmation)
app.get('/', (req, res) => {
  res.send('Threat Eyee backend is running');
});

// POST route to analyze a message for phishing or scams
app.post('/analyze', async (req, res) => {
  const { message } = req.body;

  // Check if message is provided in the request body
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Analyze the message with Groq service
    const result = await groqService.analyzeMessageWithGroq(message);

    // Ensure the response contains the necessary fields
    const response = {
      type: result.category || 'Unknown', // Use category or other identifier
      risk: result.result === 'RISK' ? true : false,  // Set risk based on 'result' being 'RISK'
      reason: result.reason || 'No reason available.',
      saferVersion: result.saferVersion || 'No safer version available.',
    };    

    // Log the result to verify it is correctly formatted
    console.log('Response sent to frontend:', response);

    // Send the response to the frontend
    res.json(response);
  } catch (error) {
    // If there's an error, log it and return a 500 error response
    console.error('Error from /analyze:', error);
    res.status(500).json({ error: error.message });
  }
});


// Start the server on the specified port
app.listen(port, () => {
  console.log(`Threat Eyee server listening on port ${port}`);
});
