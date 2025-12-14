# Render Deployment Guide

Complete guide to deploy your portfolio backend to Render.

## 🚀 Prerequisites

- ✅ GitHub account with your code pushed
- ✅ Render account (sign up at https://render.com)
- ✅ Database (local MySQL, Railway, or Render PostgreSQL)
- ✅ Email service configured (Gmail, SendGrid, etc.)

## 📋 Step-by-Step Deployment

### Step 1: Prepare Your Code

1. **Ensure all code is committed and pushed to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Verify `package.json` has correct start script:**
   ```json
   {
     "scripts": {
       "start": "node src/server.js"
     },
     "engines": {
       "node": ">=18 <21"
     }
   }
   ```

### Step 2: Create Render Web Service

1. **Go to Render Dashboard:** https://dashboard.render.com
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name:** `portfolio-backend` (or your preferred name)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid if needed)

### Step 3: Configure Environment Variables

In Render dashboard, go to **Environment** tab and add:

#### Required Database Variables
```env
DB_HOST=your_database_host
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_SSL=true
```

**For Render PostgreSQL (if using):**
```env
DB_HOST=your-postgres-host.onrender.com
DB_PORT=5432
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=your_postgres_database
DB_SSL=true
```

#### Required Server Variables
```env
PORT=10000
JWT_SECRET=your_very_secure_jwt_secret_key_here
NODE_ENV=production
```

#### Email Configuration (Optional but Recommended)
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
ADMIN_EMAIL=your-admin-email@gmail.com
ADMIN_NAME=Dnyaneshwar
```

#### Frontend URL (for CORS)
```env
FRONTEND_URL=https://dnyaneshwarpanchal.netlify.app
PORTFOLIO_URL=https://your-portfolio-url.com
```

### Step 4: Database Setup Options

#### Option A: Use Render PostgreSQL (Recommended for Render)

1. **Create PostgreSQL Database:**
   - Go to Render Dashboard → "New +" → "PostgreSQL"
   - Name it `portfolio-db`
   - Copy connection details

2. **Update Environment Variables** with PostgreSQL credentials

3. **Note:** You'll need to convert MySQL schema to PostgreSQL (see migration guide)

#### Option B: Use Railway MySQL (Easier - No Migration)

1. **Set up Railway MySQL** (see `RAILWAY_SETUP_GUIDE.md`)
2. **Use Railway credentials** in Render environment variables
3. **No schema changes needed!**

#### Option C: Use External MySQL

- Use any MySQL provider (Railway, Aiven, etc.)
- Add credentials to Render environment variables

### Step 5: Deploy

1. **Click "Create Web Service"**
2. **Render will:**
   - Clone your repository
   - Run `npm install`
   - Start your service with `npm start`
3. **Wait for deployment** (usually 2-5 minutes)
4. **Check logs** for any errors

### Step 6: Verify Deployment

1. **Check Health Endpoint:**
   ```
   https://your-service-name.onrender.com/
   ```
   Should return: `{"status":"OK","message":"Portfolio backend running 🚀"}`

2. **Test API Endpoints:**
   ```bash
   # Test blog posts
   curl https://your-service-name.onrender.com/api/blogs
   
   # Test projects
   curl https://your-service-name.onrender.com/api/projects
   ```

3. **Check Logs:**
   - Go to Render Dashboard → Your Service → Logs
   - Should see: `✅ Database connection established`
   - Should see: `✅ Email service configured successfully`

## 🔧 Configuration Checklist

- [ ] Code pushed to GitHub
- [ ] Render web service created
- [ ] All environment variables set
- [ ] Database configured and accessible
- [ ] Email service configured (optional)
- [ ] CORS origins updated
- [ ] Health check endpoint working
- [ ] API endpoints responding

## 🚨 Common Issues & Solutions

### Issue: "Database connection failed"

**Solutions:**
- Verify database credentials in environment variables
- Check database is accessible from Render (not localhost)
- Ensure `DB_SSL=true` for remote databases
- Verify database host allows connections from Render IPs

### Issue: "Port already in use"

**Solution:**
- Render automatically sets `PORT` environment variable
- Your code should use `process.env.PORT || 5000`
- ✅ Already configured correctly!

### Issue: "CORS error"

**Solutions:**
- Add your frontend URL to `FRONTEND_URL` environment variable
- Update CORS configuration in `server.js` (already done)
- Check Render service URL is in allowed origins

### Issue: "Build failed"

**Solutions:**
- Check Node.js version matches `engines` in `package.json`
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### Issue: "Service keeps restarting"

**Solutions:**
- Check application logs for errors
- Verify database connection is working
- Ensure all required environment variables are set
- Check if port is correctly configured

## 📊 Render Free Tier Limits

- **750 hours/month** (enough for 24/7 operation)
- **512 MB RAM**
- **Spins down after 15 minutes** of inactivity (freezes on first request)
- **Unlimited bandwidth**

**Note:** Free tier services spin down after inactivity. First request after spin-down may take 30-60 seconds.

## 🔒 Security Best Practices

1. **Never commit `.env` files** (already in `.gitignore`)
2. **Use strong JWT_SECRET** (random 32+ character string)
3. **Use environment variables** for all secrets
4. **Enable SSL** for database connections
5. **Restrict CORS** to known origins
6. **Regularly update dependencies**

## 🔄 Updating Your Deployment

1. **Push changes to GitHub:**
   ```bash
   git add .
   git commit -m "Update backend"
   git push origin main
   ```

2. **Render automatically detects changes** and redeploys
3. **Monitor logs** for any issues

## 📝 Environment Variables Reference

### Required
```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=3306
DB_SSL=true
PORT=10000
JWT_SECRET=your_jwt_secret
NODE_ENV=production
```

### Optional
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
ADMIN_EMAIL=admin@example.com
ADMIN_NAME=Dnyaneshwar
FRONTEND_URL=https://your-frontend.com
PORTFOLIO_URL=https://your-portfolio.com
```

## 🎯 Post-Deployment

1. **Update Frontend API URL:**
   - Update your frontend to use Render backend URL
   - Example: `https://your-service-name.onrender.com/api`

2. **Test All Endpoints:**
   - Blog posts
   - Projects
   - Contact form
   - Authentication
   - Admin routes

3. **Monitor Logs:**
   - Check for errors regularly
   - Monitor database connections
   - Watch for CORS issues

4. **Set Up Custom Domain (Optional):**
   - Go to Render Dashboard → Your Service → Settings
   - Add custom domain
   - Update DNS records

## 💡 Pro Tips

- **Use Render PostgreSQL** for better integration
- **Set up health checks** for monitoring
- **Enable auto-deploy** from main branch
- **Monitor usage** to stay within free tier
- **Set up alerts** for service failures
- **Backup database** regularly

## 🔗 Useful Links

- Render Dashboard: https://dashboard.render.com
- Render Docs: https://render.com/docs
- Render Status: https://status.render.com

---

**Your backend is now deployed on Render!** 🎉

Need help? Check Render logs or see troubleshooting section above.
