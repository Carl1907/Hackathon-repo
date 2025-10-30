const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  image: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  creatorName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Digital Art',
      'Abstract',
      'Cyberpunk',
      'Nature',
      'Geometric',
      'Space',
      'Portrait',
      'Landscape',
      '3D Art',
      'Photography'
    ]
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  likesCount: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  isListed: {
    type: Boolean,
    default: true
  },
  isSold: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  tokenId: {
    type: String,
    unique: true,
    sparse: true
  },
  contractAddress: {
    type: String,
    default: ''
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  tags: [{
    type: String,
    trim: true
  }],
  collectionName: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Indexes for better performance
nftSchema.index({ creator: 1 });
nftSchema.index({ category: 1 });
nftSchema.index({ isListed: 1 });
nftSchema.index({ createdAt: -1 });
nftSchema.index({ likesCount: -1 });
nftSchema.index({ price: 1 });

// Virtual for like status (will be populated by frontend)
nftSchema.virtual('isLiked').get(function() {
  return false; // This will be set by the frontend based on user's likes
});

// Method to increment views
nftSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Method to toggle like
nftSchema.methods.toggleLike = function(userId) {
  const likeIndex = this.likes.indexOf(userId);
  
  if (likeIndex > -1) {
    // Unlike
    this.likes.splice(likeIndex, 1);
    this.likesCount -= 1;
  } else {
    // Like
    this.likes.push(userId);
    this.likesCount += 1;
  }
  
  return this.save();
};

module.exports = mongoose.model('NFT', nftSchema);
