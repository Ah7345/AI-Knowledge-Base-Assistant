# Vercel Deployment - Environment Variables

## Important Note
⚠️ **Vercel is primarily designed for Next.js/React frontends**. For this full-stack app, you have two deployment options:

### Option 1: Split Deployment (Recommended)
- **Backend (FastAPI)**: Deploy on Render, Railway, or Heroku
- **Frontend (React)**: Deploy on Vercel

### Option 2: Vercel Serverless Functions
Convert the FastAPI app to Vercel serverless functions (requires refactoring)

---

## Environment Variables for Vercel (Frontend)

### Required Variables

| Variable Name | Description | Example Value |
|---------------|-------------|---------------|
| `VITE_API_URL` | Backend API URL | `https://your-backend.railway.app` or `https://your-app.onrender.com` |

---

## Environment Variables for Backend (Render/Railway/Heroku)

### Required Variables

| Variable Name | Description | Example Value |
|---------------|-------------|---------------|
| `OPENAI_API_KEY` | Your OpenAI API key | `your_openai_api_key_here` |
| `PERSIST_DIR` | Storage directory for ChromaDB | `./storage` |
| `USE_OPENAI_EMBEDDINGS` | Use OpenAI embeddings | `true` or `false` |
| `EMBEDDING_MODEL` | Model for sentence-transformers | `sentence-transformers/all-MiniLM-L6-v2` |
| `TOP_K` | Number of chunks to retrieve | `4` |
| `PORT` | Server port (auto-set by platform) | `8000` |

### Example Backend `.env` file:
```env
OPENAI_API_KEY=your_openai_api_key_here
PERSIST_DIR=./storage
USE_OPENAI_EMBEDDINGS=true
TOP_K=4
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
```

---

## Step-by-Step Deployment

### Step 1: Deploy Backend

**On Railway/Render:**

1. Connect your GitHub repository
2. Set these environment variables:
   ```
   OPENAI_API_KEY=your_key_here
   PERSIST_DIR=./storage
   USE_OPENAI_EMBEDDINGS=true
   TOP_K=4
   ```
3. Start command: `cd backend && python3 -m pip install -r requirements.txt && python3 app.py`
4. Get your backend URL (e.g., `https://ai-kb-backend.railway.app`)

### Step 2: Deploy Frontend on Vercel

1. Import your GitHub repository
2. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
3. Framework preset: `Vite`
4. Build command: `cd frontend && npm install && npm run build`
5. Output directory: `frontend/dist`

---

## Vercel Configuration

If deploying on Vercel, update `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  // Remove proxy config for production
})
```

And update `frontend/src/api.js` to use the environment variable:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
```

---

## Quick Setup Checklist

- [ ] Deploy backend on Railway/Render
- [ ] Set backend environment variables
- [ ] Note the backend URL
- [ ] Deploy frontend on Vercel
- [ ] Set `VITE_API_URL` in Vercel to your backend URL
- [ ] Test the application

