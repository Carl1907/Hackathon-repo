# NFT Bankerohan — Ultimate Vibe Code Prompt

Purpose: Single-source operational prompt for building and operating the NFT Bankerohan ("Palengke"-style) Web3 local marketplace. Aligns engineering, AI agents, and runtime flows across frontend, backend, smart contracts, and ops.

## Identity & Vibe
- Name: NFT Bankerohan (Local “Palengke” marketplace — buy/sell/trade local goods + NFTs)
- Tone: Helpful, fast, precise, Taglish-friendly, community-first
- Pillars: Permissionless, Wallet-first, Safe-by-default, Mobile-friendly

## Mission
- Ship a permissionless local marketplace that supports:
  - Wallet login (MetaMask/WalletConnect)
  - Listings (goods + services + NFTs) with geotags
  - Auctions and direct buy
  - Payments and royalty splits on-chain
  - Community UX (likes, saves, comments, shares)

## Success Criteria
- Frontend builds and runs: Vite + React + TS at http://localhost:3000 (or next available port)
- Backend runs: Node/Express; MongoDB optional (fallback to localStorage)
- Contracts compile and test with Hardhat (when added)
- Clear docs: README + INSTALLATION-GUIDE + prompts for agents

## Tech Constraints
- Frontend: React 18, Vite, TS, Tailwind
- Backend: Node, Express, Mongoose (optional), Multer/Cloudinary (optional)
- Web3: Ethers.js; OpenZeppelin for contracts
- Storage: IPFS preferred for NFT/media, localStorage acceptable for demo

## Core Capabilities
- Listings: create, view, filter, search, sort
- Auctions: start, bid, end, settle (when contracts present)
- Wallet: connect, network check, pay/mint
- Locality: category + city/barangay filtering; future: map view

## Safety & Compliance
- Input sanitization, file type/size validation
- JWT auth for protected API, secure cookie recommended
- Rate limiting and Helmet for backend
- Clear terms via LexChain; audit contract risks pre-deploy

---

## Operating Rules (for all agents and engineers)

### Communication
- Use tight, skimmable Markdown
- Backticks for code, files, directories, commands
- Only fence snippets, never entire messages

### Status Updates
- One-liner: what happened, what’s next, blockers
- If you say you’ll do something, do it in the same turn

### Summaries
- Bullet key outcomes, changed files, commands run
- No restating the plan

### Flow
1) Brief discovery scan
2) Parallelize read-only ops
3) Implement minimal, shippable edits
4) Validate build/run/tests
5) Summarize and hand off

### Tool Calling
- Prefer autonomous execution; don’t ask for info you can infer
- Parallelize independent ops; sequence only where necessary
- Confirm builds/tests before calling done

### Code Changes
- Keep code runnable immediately (adds, imports, env, endpoints)
- Strong naming; low nesting; early returns; minimal try/catch
- Comments explain why, not what
- Match existing formatting; no unrelated reformat

---

## Frontend Playbook
- Stack: React + Vite + TS + Tailwind
- Entry: `NFT Bankerohan/src/main.tsx`, styles `src/index.css`
- Fix-css-rule: `@import` must be first; then `@tailwind base/components/utilities`
- Data layer: localStorage DB now; API later via Express
- Web3: Ethers.js hooks `useWallet` + `useContract` (planned by CryptoGuard)

Common Tasks
- Run dev: `npm run dev`
- Add component: `src/components/` with typed props
- Pages: `src/pages/` (Home, Detail, Sell) wired via React Router

---

## Backend Playbook
- Stack: Express + Mongoose (optional) + Multer/Cloudinary (optional)
- Entry: `NFT Bankerohan/backend/server.js`
- Env: copy `env.example` → `.env` (PORT, MONGODB_URI, JWT_SECRET, CLOUDINARY_*)
- Run dev: `npm run dev`
- If no MongoDB, keep API minimal; client uses localStorage

Common Routes
- `/api/nfts` CRUD
- `/api/upload` image upload
- `/api/auth` login/register (JWT)

---

## Web3/Contracts Playbook (planned)
- Contracts: `contracts/BankerohanNFT.sol`, `contracts/AuctionHouse.sol`
- Tests: `test/*.ts`
- Deploy scripts: `scripts/deploy.ts`
- Standards: ERC-721, royalty % to treasury, events for mints/auctions

---

## Multi‑Agent System
Prompts live in `prompts/`:
- ArtSmith — NFT/media generator (Palengke vibe); outputs: PNG + metadata.json (IPFS)
- BlockMind — Solidity contracts (mint, auction, royalty) + tests
- CryptoGuard — Wallet + payments (connect, chain, pay/mint)
- EchoPulse — Social posts + campaign reports
- Insightor — Sales/traffic analytics → reports/dashboards
- TradeWeaver — Auto-list, auction ops, ownership transfer
- LexChain — Terms, audits, compliance messages
- ChatNode — In‑app helper with live state
- Synapse — Coordinator/orchestrator with progress logs

Handoffs
- ArtSmith → BlockMind (IPFS URIs)
- BlockMind events → TradeWeaver, Insightor, EchoPulse
- CryptoGuard UX events → ChatNode
- LexChain warnings → ChatNode

---

## Environments & Ports
- Frontend: 3000 (auto bumps if busy)
- Backend: 5000
- Chain: configurable (Polygon testnet recommended)

---

## Quickstart (local)
- Backend
  - `cd "./NFT Bankerohan/backend"`
  - `npm install`
  - `Copy-Item env.example .env` and set vars
  - `npm run dev`
- Frontend
  - `cd "./NFT Bankerohan"`
  - `npm install`
  - `npm run dev`

---

## Definition of Done
- Builds start without errors
- Critical flows work: view listings, create listing, like/filter/sort
- Wallet connect works when enabled
- Docs updated: README, INSTALLATION-GUIDE, Prompt.md, prompts/*

## Nice‑to‑Have (post‑MVP)
- Map view + geo filters
- Push notifications for bids and sales
- On-chain indexing for analytics
- Mobile PWA install

---

## Glossary
- Palengke: local open market in the Philippines
- Barangay: smallest local government unit; use for geo filters

Stay fast. Keep shipping. Make the local market thrive. 💚
