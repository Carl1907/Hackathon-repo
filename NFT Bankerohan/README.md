# NFT Bankerohan

A complete NFT marketplace with both frontend and backend, built with React, TypeScript, Node.js, Express, and MongoDB. Features a clean, elegant design with smooth animations and responsive layout.

## Features

- 🎨 **Browse NFTs**: View a curated collection of digital art
- 💰 **Buy & Bid**: Purchase NFTs or place bids on auctions
- 🎯 **Sell NFTs**: Upload and list your own digital artwork
- 🔗 **Wallet Integration**: Connect with MetaMask and other Ethereum wallets
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- ⚡ **Smooth Animations**: Subtle, professional animations throughout
- 🎨 **Minimal Design**: Clean, modern interface with Corbel font
- 🚀 **Full Backend**: Complete API with authentication, file upload, and database

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** authentication
- **Multer** for file uploads
- **Helmet** for security
- **CORS** for cross-origin requests

## Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn package manager

### 1. Start the Backend

**Windows:**
```bash
# Double-click start-backend.bat
# OR run manually:
cd backend
npm install
npm run dev
```

**Mac/Linux:**
```bash
# Make executable and run
chmod +x start-backend.sh
./start-backend.sh
# OR run manually:
cd backend
npm install
npm run dev
```

The backend will start on `http://localhost:5000`

### 2. Start the Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:3000`

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

## Project Structure

```
NFT Museum/
├── src/                    # Frontend React app
│   ├── components/         # Reusable UI components
│   ├── contexts/          # React contexts (NFT, Wallet)
│   ├── pages/             # Main application pages
│   ├── services/          # API service layer
│   └── App.tsx            # Main app component
├── backend/               # Backend Node.js API
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   └── server.js         # Main server file
├── package.json          # Frontend dependencies
└── README.md             # This file
```

## Backend API

### Authentication Endpoints
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### NFT Endpoints
- `GET /api/nfts` - Get all NFTs (with pagination, search, filter)
- `GET /api/nfts/:id` - Get single NFT
- `POST /api/nfts` - Create new NFT
- `PUT /api/nfts/:id/like` - Toggle like on NFT
- `GET /api/nfts/meta/categories` - Get all categories
- `GET /api/nfts/meta/stats` - Get marketplace stats

### File Upload
- `POST /api/upload/image` - Upload image file

## Environment Setup

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/nft-bankerohan
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key
MAX_FILE_SIZE=10485760
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Database Schema

### User Model
- username, email, password (hashed)
- walletAddress, profileImage, bio
- isVerified, role

### NFT Model
- title, description, image, imageUrl
- creator, creatorName, price, category
- likes, likesCount, views
- isListed, isSold, owner
- tags, metadata

## Features in Detail

### Frontend Features
- **NFT Grid Display** - Responsive grid with hover effects
- **Search & Filter** - Find NFTs by title, creator, or category
- **Wallet Integration** - Connect/disconnect with loading states
- **Interactive Cards** - Like, view, buy, and bid buttons
- **Detailed Views** - Full NFT information with bidding interface
- **Upload Interface** - Drag-and-drop image upload with preview
- **Mobile Responsive** - Optimized for all screen sizes

### Backend Features
- **JWT Authentication** - Secure token-based authentication
- **File Upload** - Image upload with validation and storage
- **Database Operations** - Full CRUD operations for NFTs and users
- **Search & Filtering** - Advanced search and filtering capabilities
- **Rate Limiting** - API protection against abuse
- **Security Middleware** - CORS, Helmet, input validation
- **Error Handling** - Comprehensive error handling and logging

## Development

### Running in Development Mode
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

### Building for Production
```bash
# Build frontend
npm run build

# Start backend in production
cd backend
npm start
```

## Deployment

### Backend Deployment
1. Set `NODE_ENV=production`
2. Use production MongoDB instance
3. Set secure JWT secret
4. Configure CORS origins
5. Use reverse proxy (nginx)
6. Enable HTTPS

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy `dist` folder to static hosting
3. Update API URL in environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues:
1. Check that MongoDB is running
2. Verify environment variables are set correctly
3. Check console logs for error messages
4. Ensure both frontend and backend are running
