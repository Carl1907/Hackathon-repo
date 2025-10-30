const express = require('express');
const router = express.Router();
const NFT = require('../models/NFT');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');

// GET /api/nfts - Get all NFTs with pagination and filtering
router.get('/', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    
    const filter = { isListed: true };
    
    // Category filter
    if (req.query.category && req.query.category !== 'all') {
      filter.category = req.query.category;
    }
    
    // Search filter
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { creatorName: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Sort options
    let sort = { createdAt: -1 }; // Default: newest first
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'oldest':
          sort = { createdAt: 1 };
          break;
        case 'price-low':
          sort = { price: 1 };
          break;
        case 'price-high':
          sort = { price: -1 };
          break;
        case 'popular':
          sort = { likesCount: -1 };
          break;
        default:
          sort = { createdAt: -1 };
      }
    }
    
    const nfts = await NFT.find(filter)
      .populate('creator', 'username profileImage')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Add like status for authenticated users
    if (req.user) {
      nfts.forEach(nft => {
        nft.isLiked = nft.likes.includes(req.user._id);
      });
    } else {
      nfts.forEach(nft => {
        nft.isLiked = false;
      });
    }
    
    const total = await NFT.countDocuments(filter);
    
    res.json({
      nfts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    res.status(500).json({ error: 'Failed to fetch NFTs' });
  }
});

// GET /api/nfts/:id - Get single NFT
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const nft = await NFT.findById(req.params.id)
      .populate('creator', 'username profileImage bio')
      .populate('owner', 'username profileImage');
    
    if (!nft) {
      return res.status(404).json({ error: 'NFT not found' });
    }
    
    // Increment views
    await nft.incrementViews();
    
    // Add like status
    if (req.user) {
      nft.isLiked = nft.likes.includes(req.user._id);
    } else {
      nft.isLiked = false;
    }
    
    res.json(nft);
  } catch (error) {
    console.error('Error fetching NFT:', error);
    res.status(500).json({ error: 'Failed to fetch NFT' });
  }
});

// POST /api/nfts - Create new NFT
router.post('/', authenticateToken, upload.single('image'), handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }
    
    const { title, description, price, category, tags } = req.body;
    
    // Validate required fields
    if (!title || !description || !price || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Create NFT
    const nft = new NFT({
      title: title.trim(),
      description: description.trim(),
      price: parseFloat(price),
      category,
      creator: req.user._id,
      creatorName: req.user.username,
      image: req.file.filename,
      imageUrl: `/uploads/${req.file.filename}`,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      owner: req.user._id
    });
    
    await nft.save();
    
    // Populate creator info
    await nft.populate('creator', 'username profileImage');
    
    res.status(201).json({
      message: 'NFT created successfully',
      nft
    });
  } catch (error) {
    console.error('Error creating NFT:', error);
    res.status(500).json({ error: 'Failed to create NFT' });
  }
});

// PUT /api/nfts/:id/like - Toggle like on NFT
router.put('/:id/like', authenticateToken, async (req, res) => {
  try {
    const nft = await NFT.findById(req.params.id);
    
    if (!nft) {
      return res.status(404).json({ error: 'NFT not found' });
    }
    
    await nft.toggleLike(req.user._id);
    
    res.json({
      message: 'Like toggled successfully',
      likesCount: nft.likesCount,
      isLiked: nft.likes.includes(req.user._id)
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ error: 'Failed to toggle like' });
  }
});

// GET /api/nfts/user/:userId - Get NFTs by user
router.get('/user/:userId', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    
    const nfts = await NFT.find({ creator: req.params.userId })
      .populate('creator', 'username profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Add like status
    if (req.user) {
      nfts.forEach(nft => {
        nft.isLiked = nft.likes.includes(req.user._id);
      });
    } else {
      nfts.forEach(nft => {
        nft.isLiked = false;
      });
    }
    
    const total = await NFT.countDocuments({ creator: req.params.userId });
    
    res.json({
      nfts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      }
    });
  } catch (error) {
    console.error('Error fetching user NFTs:', error);
    res.status(500).json({ error: 'Failed to fetch user NFTs' });
  }
});

// GET /api/nfts/categories - Get all categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await NFT.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET /api/nfts/meta/stats - Get marketplace stats
router.get('/meta/stats', async (req, res) => {
  try {
    const stats = await NFT.aggregate([
      {
        $group: {
          _id: null,
          totalNFTs: { $sum: 1 },
          totalLikes: { $sum: '$likesCount' },
          totalViews: { $sum: '$views' },
          averagePrice: { $avg: '$price' }
        }
      }
    ]);
    
    const creatorCount = await NFT.distinct('creator').length;
    
    res.json({
      totalNFTs: stats[0]?.totalNFTs || 0,
      totalLikes: stats[0]?.totalLikes || 0,
      totalViews: stats[0]?.totalViews || 0,
      totalCreators: creatorCount,
      averagePrice: stats[0]?.averagePrice || 0
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
