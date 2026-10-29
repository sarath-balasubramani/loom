# Loom & Lathe

Full-stack store front: React (Vite) + Node.js + Express + MongoDB.

## Structure
- `client/` React app (home, shop with search/filter/sort, wishlist, account, info pages)
- `server/` Express API (`GET /api/products`, `POST /api/subscribers`, `GET /api/health`)
- `server/models/` Mongoose models (Product, Subscriber)

## Run
Requires Node 18+ and MongoDB running locally (or an Atlas URI).

1. `npm run install:all`
2. Edit `server/.env` if your MongoDB is not at `mongodb://127.0.0.1:27017`
3. Terminal 1: `npm run server` (seeds the 12 products on first start)
4. Terminal 2: `npm run client`, then open http://localhost:5173
"# loom" 
