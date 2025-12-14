# Render Deployment - Quick Start

## 🚀 Fast Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### 2. Create Render Service
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Name:** `portfolio-backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### 3. Add Environment Variables

**Required:**
```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=3306
DB_SSL=true
PORT=10000
JWT_SECRET=your_secure_secret_key
NODE_ENV=production
```

**Optional (Email):**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
ADMIN_EMAIL=admin@example.com
ADMIN_NAME=Dnyaneshwar
```

**CORS (if needed):**
```env
FRONTEND_URL=https://your-frontend.com
```

### 4. Deploy
Click "Create Web Service" and wait 2-5 minutes.

### 5. Verify
Test: `https://your-service.onrender.com/`

Should return: `{"status":"OK","message":"Portfolio backend running 🚀"}`

## ✅ That's It!

Your backend is now live on Render!

See `RENDER_DEPLOYMENT_GUIDE.md` for detailed instructions.
