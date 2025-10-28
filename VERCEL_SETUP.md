# Vercel Deployment Setup

## Configuration in Vercel Dashboard

### Project Settings:

1. **Framework Preset**: Select `Vite`

2. **Root Directory**: Set to `frontend`

   - Click "Override" and enter: `frontend`
   - This tells Vercel to look in the frontend folder

3. **Build Command**: `npm run build`
   - Should auto-detect from package.json

4. **Output Directory**: `dist`
   - Vite outputs to dist folder by default

5. **Install Command**: `npm install`
   - Auto-detected

---

## Environment Variables

Add this in Vercel Environment Variables:

| Variable Name | Value |
|---------------|-------|
| `VITE_API_URL` | `https://your-backend-url.onrender.com` |

Replace `your-backend-url.onrender.com` with your actual Render backend URL.

---

## Deployment Flow

1. **Render**: Deploy backend first
   - Get your backend URL
   - Example: `https://ai-kb-backend.onrender.com`

2. **Vercel**: Deploy frontend
   - Add environment variable: `VITE_API_URL = https://ai-kb-backend.onrender.com`
   - Deploy

---

## Troubleshooting

### Error: "react-scripts not found"
- Cause: Vercel detected Create React App instead of Vite
- Fix: Set Root Directory to `frontend` in project settings

### Build fails
- Make sure Root Directory is set to `frontend`
- Check that vercel.json exists in project root

### API calls fail
- Verify `VITE_API_URL` environment variable is set
- Check that backend is running on Render
- Test backend URL directly in browser

