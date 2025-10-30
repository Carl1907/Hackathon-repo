# NFT Generator API

A simple Node.js + Express backend API that generates random NFTs with customizable traits.

## Features

- Generates unique NFTs with random traits
- Three trait categories: hat, head, and body
- Returns UUID, traits, and timestamp
- CORS enabled
- Beautiful web frontend included

## Installation

1. Install dependencies:
```bash
npm install
```

## Usage

### Start the server:
```bash
npm start
```

### For development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Using the Frontend

Once the server is running, open your browser and visit:
```
http://localhost:3000
```

You'll see a beautiful web interface where you can click the "Generate NFT" button to create random NFTs with all three traits displayed in real-time.

## API Endpoints

### GET /api/generate-nft

Generates a random NFT with unique ID and traits.

**Response:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "traits": {
    "hat": "Top Hat",
    "head": "Robot",
    "body": "Warrior"
  },
  "createdAt": "2024-01-15T10:30:45.123Z"
}
```

## Customizing Traits

Edit the JSON files in the `traits/` folder:
- `traits/hat.json` - Hat options
- `traits/head.json` - Head/character types
- `traits/body.json` - Body/class types

## Technologies

- **Express** - Web framework
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation
- **HTML/CSS/JavaScript** - Frontend UI

## Project Structure

```
Backend/
├── public/
│   └── index.html          # Frontend UI
├── traits/
│   ├── hat.json           # Hat trait options
│   ├── head.json          # Head trait options
│   └── body.json          # Body trait options
├── server.js              # Main server file
├── package.json           # Dependencies
└── README.md             # This file
```

