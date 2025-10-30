const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public and assets directories
app.use(express.static('public'));
app.use('/assets', express.static('assets'));

// Helper function to read trait files and return a random trait
function getRandomTrait(traitType) {
  try {
    const filePath = path.join(__dirname, 'traits', `${traitType}.json`);
    const data = fs.readFileSync(filePath, 'utf8');
    const traits = JSON.parse(data);
    
    // Return a random trait from the array (now returns object with name and image)
    const randomIndex = Math.floor(Math.random() * traits.length);
    return traits[randomIndex];
  } catch (error) {
    console.error(`Error reading ${traitType} file:`, error);
    return { name: 'Unknown', image: '' };
  }
}

// Route: Generate NFT
app.get('/api/generate-nft', (req, res) => {
  try {
    const nft = {
      id: uuidv4(),
      traits: {
        hat: getRandomTrait('hat'),
        head: getRandomTrait('head')
      },
      createdAt: new Date().toISOString()
    };

    res.json(nft);
  } catch (error) {
    console.error('Error generating NFT:', error);
    res.status(500).json({ error: 'Failed to generate NFT' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 NFT Generator API is running on http://localhost:${PORT}`);
  console.log(`🎨 Frontend available at: http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/generate-nft`);
});

