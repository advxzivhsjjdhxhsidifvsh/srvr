const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow CORS

// Default route to handle the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Proxy Server!');
});

// API route to fetch game status
app.get('/api/game-status', async (req, res) => {
    try {
        const response = await fetch('https://api.bronzeforever.net/v3/game/status', {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        if (!response.ok) {
            return res.status(response.status).send('Error fetching data from the API.');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching game status:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
