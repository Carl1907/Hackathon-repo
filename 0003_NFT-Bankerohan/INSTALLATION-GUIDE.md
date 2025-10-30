# NFT Bankerohan — Installation Guide

This guide helps you install and run both the frontend (Vite React) and backend (Express/MongoDB) for the NFT Bankerohan app contained in this submission.

## Prerequisites
- Node.js 18+
- npm 9+
- MongoDB instance (local or hosted)
- Optional: Cloudinary account for media storage (for image uploads)

## 1) Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd "./NFT Bankerohan/backend"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` from the provided example and fill values:
   ```powershell
   Copy-Item env.example .env
   ```
4. Set required environment variables in `.env`:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (if using Cloudinary)
5. Start the backend:
   ```bash
   npm run dev   # nodemon
   # or
   npm start     # node server.js
   ```

## 2) Frontend Setup

1. In a new terminal, navigate to the frontend root:
   ```bash
   cd "./NFT Bankerohan"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
4. Open the URL printed in the terminal (typically `http://localhost:5173`). Ensure the backend API is running.

## Troubleshooting
- If the frontend cannot reach the API, confirm the backend port and update any API base URL in the frontend services if applicable.
- Ensure MongoDB is running and `MONGODB_URI` is correct.
- For upload errors, verify Cloudinary credentials and network connectivity.

## Notes
- This submission’s app resides under `./NFT Bankerohan/` with the backend in `./NFT Bankerohan/backend/`.
- `node_modules` were preserved for convenience; if missing, run `npm install` in each directory.
