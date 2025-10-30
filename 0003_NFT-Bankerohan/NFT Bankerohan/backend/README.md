# NFT Bankerohan Backend API

A complete backend API for the NFT Bankerohan marketplace built with Node.js, Express, and MongoDB.

## Features

- 🔐 **User Authentication** - JWT-based authentication system
- 🖼️ **File Upload** - Image upload with validation and storage
- 🎨 **NFT Management** - CRUD operations for NFTs
- ❤️ **Like System** - Like/unlike functionality
- 🔍 **Search & Filter** - Advanced search and filtering
- 📊 **Analytics** - Marketplace statistics and metrics
- 🛡️ **Security** - Rate limiting, CORS, and input validation

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile

### NFTs
- `GET /api/nfts` - Get all NFTs (with pagination, search, filter)
- `GET /api/nfts/:id` - Get single NFT
- `POST /api/nfts` - Create new NFT
- `PUT /api/nfts/:id/like` - Toggle like on NFT
- `GET /api/nfts/user/:userId` - Get NFTs by user
- `GET /api/nfts/meta/categories` - Get all categories
- `GET /api/nfts/meta/stats` - Get marketplace stats

### File Upload
- `POST /api/upload/image` - Upload image file

### Health Check
- `GET /api/health` - API health status

## Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Set up environment variables:**
```bash
cp env.example .env
# Edit .env with your configuration
```

3. **Start MongoDB:**
```bash
# Make sure MongoDB is running on your system
mongod
```

4. **Run the server:**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/nft-bankerohan

# Frontend URL
FRONTEND_URL=http://localhost:3000

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# File Upload Configuration
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp
```

## Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  walletAddress: String,
  profileImage: String,
  bio: String,
  isVerified: Boolean,
  role: String (enum: ['user', 'admin'])
}
```

### NFT Model
```javascript
{
  title: String (required),
  description: String (required),
  image: String (required),
  imageUrl: String (required),
  creator: ObjectId (ref: 'User'),
  creatorName: String (required),
  price: Number (required),
  category: String (required, enum),
  likes: [ObjectId] (ref: 'User'),
  likesCount: Number,
  views: Number,
  isListed: Boolean,
  isSold: Boolean,
  owner: ObjectId (ref: 'User'),
  tags: [String],
  metadata: Mixed
}
```

## API Usage Examples

### Register User
```javascript
POST /api/users/register
Content-Type: application/json

{
  "username": "artist123",
  "email": "artist@example.com",
  "password": "password123"
}
```

### Create NFT
```javascript
POST /api/nfts
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "My Digital Art",
  "description": "A beautiful digital artwork",
  "price": 0.5,
  "category": "Digital Art",
  "image": <file>
}
```

### Get NFTs with Filters
```javascript
GET /api/nfts?page=1&limit=12&category=Digital Art&search=art&sort=newest
```

## Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt for password security
- **Rate Limiting** - Prevents API abuse
- **Input Validation** - Validates all input data
- **File Type Validation** - Only allows image files
- **CORS Protection** - Configurable cross-origin requests
- **Helmet Security** - Security headers

## Error Handling

The API returns consistent error responses:

```javascript
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Running in Development Mode
```bash
npm run dev
```

### Database Seeding
The database will automatically create sample NFTs on first run.

### Testing
```bash
# Test API endpoints
curl http://localhost:5000/api/health
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Set secure JWT secret
4. Configure proper CORS origins
5. Use a reverse proxy (nginx)
6. Enable HTTPS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
