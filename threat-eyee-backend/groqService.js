const axios = require('axios');

// Function to analyze message with Groq API
const analyzeMessageWithGroq = async (message) => {
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "system",
            content: `You are a cybersecurity threat detection assistant. Analyze the given message for potential risks such as phishing, scam, social engineering, or other suspicious activities. Provide a detailed result in the following structure:
{
  "result": "RISK",           // The risk level (e.g., RISK or SAFE)
  "category": "Phishing",     // Type of threat (e.g., Phishing, Scam, Social Engineering)
  "reason": "Suspicious link detected", // Why this message is risky
  "saferVersion": "A safer version of the message with risky content removed" // A rewritten, safer version of the message
}`
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.3 // Slightly increased for more natural responses
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Log raw response for debugging
    console.log('Groq API Raw Response:', response.data);

    const rawContent = response.data.choices[0].message.content.trim();

    // Clean the response to get the JSON portion
    const jsonStartIndex = rawContent.indexOf('{');
    const jsonEndIndex = rawContent.lastIndexOf('}');

    if (jsonStartIndex === -1 || jsonEndIndex === -1) {
      throw new Error('Failed to extract JSON from response');
    }

    const cleanedResponse = rawContent.slice(jsonStartIndex, jsonEndIndex + 1);
    console.log('Groq API Cleaned Response:', cleanedResponse);

    const parsed = JSON.parse(cleanedResponse);

    // Ensure the response contains all required fields
    if (!parsed.result) {
      parsed.result = 'SAFE'; // Default to 'SAFE' if no result is found
    }
    if (!parsed.category) {
      parsed.category = 'General'; // Default to 'General' if no category is found
    }
    if (!parsed.reason) {
      parsed.reason = 'No issues detected'; // Default reason if no risk found
    }
    if (!parsed.saferVersion) {
      parsed.saferVersion = message; // Return the original message as safer version if not provided
    }

    return parsed;
  } catch (error) {
    console.error('Error in groqService:', error.response ? error.response.data : error.message);
    throw new Error('Failed to analyze message with Groq');
  }
};

module.exports = { analyzeMessageWithGroq };
