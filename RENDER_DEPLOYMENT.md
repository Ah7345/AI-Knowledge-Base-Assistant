# Render.com Docker Deployment Guide

## Environment Variables for Render

Set these environment variables in your Render dashboard:

### Required Variables:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `OPENAI_API_KEY` | `your_openai_api_key_here` | Your OpenAI API key (keep secret!) |
| `PERSIST_DIR` | `/app/backend/storage` | Storage directory |
| `USE_OPENAI_EMBEDDINGS` | `true` | Use OpenAI embeddings |
| `TOP_K` | `4` | Number of retrieval chunks |
| `EMBEDDING_MODEL` | `sentence-transformers/all-MiniLM-L6-v2` | Embedding model |

---

## Deployment Steps

### 1. Connect Repository
- Connect your GitHub repo: `https://github.com/Ah7345/AI-Knowledge-Base-Assistant`

### 2. Configuration
- **Name**: `AI-Knowledge-Base-Assistant`
- **Language**: `Docker`
- **Branch**: `main`
- **Root Directory**: Leave empty (default)
- **Region**: `Oregon (US West)`

### 3. Environment Variables
Add all the variables listed above in the Environment tab.

### 4. Build & Deploy
- Build Command: (auto-detected from Dockerfile)
- Start Command: (handled by Dockerfile CMD)
- Render will automatically build and deploy

---

## Backend URL
After deployment, you'll get a URL like:
```
https://ai-knowledge-base-assistant.onrender.com
```

Use this for your frontend `VITE_API_URL` environment variable when deploying to Vercel.

---

## Expected Deploy Time
- First deploy: ~5-10 minutes (downloading dependencies)

---

## API Endpoints Available
- `GET /` - API status
- `GET /health` - Health check  
- `POST /upload` - Upload documents
- `POST /ask` - Ask questions
- `GET /documents` - List documents
- `DELETE /documents` - Clear all

---

## Notes
- Storage persists between deployments in Render's filesystem
- The service will auto-deploy on Git push to main branch
- Free tier sleeps after 15 minutes of inactivity (wakes on first request)
