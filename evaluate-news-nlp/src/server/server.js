// import required modules
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');


// Initialize dotenv to use .env file
dotenv.config();

// initialize express app
const app = express();

app.use(express.static('dist'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

console.log(__dirname);

// middleware
app.use(cors());
app.use(express.json());

// API key stored in the environment variables
const apiKey = process.env.API_KEY;

// Test route
app.get('/', (req, res) => {
    res.sendFile(path.resolve('src/client/views/index.html'));
});


// Route to call the MeaningCloud API
app.post('/api/data', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text input is required' });
    }

    try {
        const apiKey = process.env.API_KEY;

        const response = await axios.get('https://api.meaningcloud.com/sentiment-2.1', {
            params: {
                key: apiKey,
                txt: text,
                lang: 'en'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error calling API:', error);
        res.status(500).json({ error: 'API call failed' });
    }
});


// Define a port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

