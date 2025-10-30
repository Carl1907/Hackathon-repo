const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');

// POST /api/upload/image - Upload image file
router.post('/image', authenticateToken, upload.single('image'), handleUploadError, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    res.json({
      message: 'Image uploaded successfully',
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      url: `/uploads/${req.file.filename}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// GET /api/upload/test - Test upload endpoint
router.get('/test', authenticateToken, (req, res) => {
  res.json({ message: 'Upload endpoint is working' });
});

module.exports = router;
