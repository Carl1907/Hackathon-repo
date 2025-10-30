# NFT Bankerohan — Hackathon Submission

## Project Information

- **Name (Team)**: NFT Bankerohan (Team Bankerohan)
- **Project Name**: NFT Bankerohan
- **Track**: Open Track — Web3/Blockchain
- **Repository Location**: `./NFT Bankerohan/`

## Project Description

NFT Bankerohan is a minimal NFT marketplace for viewing, listing, buying, and selling NFTs. The project includes:
- A modern React + Vite + TypeScript frontend with Tailwind CSS
- A Node.js + Express backend API with MongoDB (via Mongoose)
- Media upload support (Multer/Cloudinary) and basic auth/JWT middleware

This submission showcases a lightweight, fast UX for browsing NFTs, viewing details, and managing listings, with a straightforward backend for persistence and asset handling.

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- MongoDB instance (local or hosted)
- Optional: Cloudinary account for media storage

### 1) Run the Backend API

From the backend folder:

```bash
cd "./NFT Bankerohan/backend"
npm install
# Copy environment example and fill values
# Windows PowerShell
Copy-Item env.example .env

# Start in dev or prod
npm run dev   # with nodemon
# or
npm start     # node server.js
```

Required environment variables (see `env.example`):
- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (if using Cloudinary)

The server defaults to `server.js` and listens on the port defined in your `.env` or its internal default.

### 2) Run the Frontend (Vite React App)

From the frontend root:

```bash
cd "./NFT Bankerohan"
npm install
npm run dev
```

This starts the Vite dev server. Follow the URL printed in the terminal (typically `http://localhost:5173`). Ensure the backend API is running and the frontend is configured to point to it if applicable.

## Folder Structure

- Frontend app: `./NFT Bankerohan/`
- Backend API: `./NFT Bankerohan/backend/`

Key backend files:
- `server.js` — Express app entry
- `routes/` — API routes for users, NFTs, and uploads
- `models/` — Mongoose models (`User`, `NFT`)
- `middleware/` — auth, upload handlers

Key frontend files:
- `src/pages/` — `HomePage`, `NFTDetailPage`, `SellPage`
- `src/components/` — `NFTGrid`, `NFTCard`, `Header`, `SearchFilter`
- `src/contexts/` — `NFTContext`, `WalletContext`

## Tech Stack

- Frontend: React 18, Vite, TypeScript, Tailwind CSS, React Router, Framer Motion, Lucide Icons
- Backend: Node.js, Express, MongoDB/Mongoose, Multer, JWT, Helmet, Rate Limiting, Cloudinary (optional)

## Team

- Team Bankerohan

## License

- MIT (see repository `LICENSE` files where applicable)

---

This README follows the OpenxAI Global AI Accelerator submission format. Incremented folder index: `0003`.
