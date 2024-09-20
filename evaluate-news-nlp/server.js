// Import required modules
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Initialize dotenv to use .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Log every incoming request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve static files from the "src" directory
// This serves files like CSS, JS, images from src directory
app.use(express.static(path.join(__dirname, 'src')));

// Root route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'index.html'));  // Assuming your index.html is in 'src/views'
});

// Route to call the MeaningCloud API
app.post('/data', async (req, res) => {
    const { text } = req.body;

    // Handle missing text input
    if (!text) {
        return res.status(400).json({ error: 'Text input is required' });
    }

    try {
        // Use environment variable for API key
        const apiKey = process.env.API_KEY;

        // Make API request to MeaningCloud
        const response = await axios.get('https://api.meaningcloud.com/sentiment-2.1', {
            params: {
                key: apiKey,
                txt: text,
                lang: 'en'
            }
        });

        // Send API response back to client
        res.json(response.data);
    } catch (error) {
        console.error('Error calling API:', error);
        res.status(500).json({ error: 'API call failed' });
    }
});

// Define a port
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
