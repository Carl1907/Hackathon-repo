const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3001; // Different port to avoid conflict with main backend

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/assets', express.static('assets'));

// Serve enhanced UI at root for convenience
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'enhanced-index.html'));
});

// Configure multer for image processing
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Helper function to read trait files and return a random trait
function getRandomTrait(traitType) {
  try {
    const filePath = path.join(__dirname, 'traits', `${traitType}.json`);
    const data = fs.readFileSync(filePath, 'utf8');
    const traits = JSON.parse(data);
    
    const randomIndex = Math.floor(Math.random() * traits.length);
    return traits[randomIndex];
  } catch (error) {
    console.error(`Error reading ${traitType} file:`, error);
    return { name: 'Unknown', image: '' };
  }
}

// Helper function to combine SVG layers into a single image
async function combineSVGLayers(headImage, hatImage) {
  try {
    // For now, we'll return the head image as the main image
    // In a real implementation, you'd combine the SVG layers
    return headImage;
  } catch (error) {
    console.error('Error combining SVG layers:', error);
    return headImage;
  }
}

// Route: Generate NFT
app.get('/api/generate-nft', (req, res) => {
  try {
    const hatTrait = getRandomTrait('hat');
    const headTrait = getRandomTrait('head');
    
    const nft = {
      id: uuidv4(),
      traits: {
        hat: hatTrait,
        head: headTrait
      },
      createdAt: new Date().toISOString(),
      metadata: {
        rarity: 'Common', // You can implement rarity logic
        collection: 'Generated Collection'
      }
    };

    res.json(nft);
  } catch (error) {
    console.error('Error generating NFT:', error);
    res.status(500).json({ error: 'Failed to generate NFT' });
  }
});

// Route: Save generated NFT to main marketplace
app.post('/api/save-nft', upload.single('image'), async (req, res) => {
  try {
    const { nftData, title, description, price, category } = req.body;
    
    // Parse the NFT data
    const parsedNFTData = JSON.parse(nftData);
    
    // Create a combined image (you can enhance this)
    const combinedImage = await combineSVGLayers(
      parsedNFTData.traits.head.image,
      parsedNFTData.traits.hat.image
    );
    
    // Prepare NFT data for main marketplace
    const marketplaceNFT = {
      title: title || `Generated NFT #${parsedNFTData.id.slice(0, 8)}`,
      description: description || `A unique NFT with ${parsedNFTData.traits.head.name} head and ${parsedNFTData.traits.hat.name} hat`,
      price: parseFloat(price) || 0.1,
      category: category || 'Generated',
      traits: parsedNFTData.traits,
      metadata: {
        ...parsedNFTData.metadata,
        generatedId: parsedNFTData.id,
        generatedAt: parsedNFTData.createdAt
      },
      image: combinedImage,
      creator: 'NFT Generator',
      tags: ['generated', 'unique', parsedNFTData.traits.head.name.toLowerCase(), parsedNFTData.traits.hat.name.toLowerCase()]
    };
    
    // Send to main marketplace backend
    const mainBackendUrl = 'http://localhost:5000/api/nfts';
    
    try {
      const response = await fetch(mainBackendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication header if needed
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(marketplaceNFT)
      });
      
      if (response.ok) {
        const savedNFT = await response.json();
        res.json({
          success: true,
          message: 'NFT saved to marketplace successfully!',
          nft: savedNFT
        });
      } else {
        throw new Error('Failed to save to main marketplace');
      }
    } catch (marketplaceError) {
      console.error('Error saving to marketplace:', marketplaceError);
      res.status(500).json({ 
        error: 'Failed to save NFT to marketplace',
        details: marketplaceError.message
      });
    }
    
  } catch (error) {
    console.error('Error saving NFT:', error);
    res.status(500).json({ error: 'Failed to save NFT' });
  }
});

// Route: Get all generated NFTs
app.get('/api/generated-nfts', (req, res) => {
  try {
    // This would typically fetch from your main database
    // For now, return a placeholder
    res.json({
      message: 'Generated NFTs endpoint',
      note: 'This would fetch NFTs from the main marketplace database'
    });
  } catch (error) {
    console.error('Error fetching generated NFTs:', error);
    res.status(500).json({ error: 'Failed to fetch generated NFTs' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 NFT Generator API is running on http://localhost:${PORT}`);
  console.log(`🎨 Frontend available at: http://localhost:${PORT}`);
  console.log(`📡 Generate endpoint: http://localhost:${PORT}/api/generate-nft`);
  console.log(`💾 Save endpoint: http://localhost:${PORT}/api/save-nft`);
});
