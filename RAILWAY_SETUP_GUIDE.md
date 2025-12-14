# Railway MySQL Setup Guide

Complete step-by-step guide to set up MySQL database on Railway and connect your portfolio backend.

## 🚀 Step 1: Sign Up for Railway

1. Go to **https://railway.app**
2. Click **"Start a New Project"** or **"Login"**
3. Sign up with GitHub (recommended) or email

## 📦 Step 2: Create MySQL Database

1. After logging in, click **"New Project"**
2. Select **"Empty Project"** or **"Deploy from GitHub"** (if you want to deploy your backend too)
3. Click **"+ New"** button
4. Select **"Database"** → **"Add MySQL"**
5. Railway will automatically provision a MySQL database

## 🔑 Step 3: Get Connection Details

1. Click on your **MySQL service** in the Railway dashboard
2. Go to the **"Variables"** tab
3. You'll see these environment variables:
   - `MYSQLHOST` - Your database host
   - `MYSQLPORT` - Port (usually 3306)
   - `MYSQLUSER` - Database user (usually `root`)
   - `MYSQLPASSWORD` - Database password
   - `MYSQLDATABASE` - Database name (usually `railway`)

**Note:** Railway also provides a connection string in the **"Connect"** tab if you prefer.

## ⚙️ Step 4: Update Your .env File

Update your `portfolio-backend/.env` file with Railway credentials:

```env
# Railway MySQL Configuration
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_railway_password_here
DB_NAME=railway
DB_SSL=true

# Your other environment variables
JWT_SECRET=your_jwt_secret
PORT=5000
# ... other configs
```

**Important:** 
- Replace `containers-us-west-xxx.railway.app` with your actual `MYSQLHOST` value
- Replace `your_railway_password_here` with your actual `MYSQLPASSWORD` value
- The database name is usually `railway` (from `MYSQLDATABASE`)

## 📥 Step 5: Import Your Database Schema

You have two options to import your database:

### Option A: Using MySQL Command Line (Recommended)

1. **Install MySQL Client** (if not already installed):
   ```bash
   # Windows (using Chocolatey)
   choco install mysql
   
   # Or download MySQL Workbench: https://dev.mysql.com/downloads/workbench/
   ```

2. **Export your current database** (if you have data):
   ```bash
   # If you have access to your old database
   mysqldump -h old_host -u old_user -p old_database > backup.sql
   ```

3. **Import to Railway:**
   ```bash
   mysql -h containers-us-west-xxx.railway.app -u root -p railway < portfolio-backend/sql/schema.sql
   mysql -h containers-us-west-xxx.railway.app -u root -p railway < portfolio-backend/sql/blog_schema.sql
   ```

### Option B: Using Railway's MySQL Terminal

1. In Railway dashboard, click on your **MySQL service**
2. Go to **"Data"** tab
3. Click **"Open MySQL Terminal"**
4. Copy and paste your SQL schema files:
   - First run: `portfolio-backend/sql/schema.sql`
   - Then run: `portfolio-backend/sql/blog_schema.sql`

### Option C: Using MySQL Workbench (GUI)

1. Download **MySQL Workbench**: https://dev.mysql.com/downloads/workbench/
2. Create a new connection:
   - **Hostname:** Your Railway `MYSQLHOST` value
   - **Port:** `3306`
   - **Username:** `root`
   - **Password:** Your Railway `MYSQLPASSWORD`
   - **Default Schema:** `railway`
3. Click **"Test Connection"** (should succeed)
4. Open your SQL files and execute them:
   - File → Open SQL Script → Select `schema.sql` → Execute
   - File → Open SQL Script → Select `blog_schema.sql` → Execute

## ✅ Step 6: Test Your Connection

1. **Start your backend server:**
   ```bash
   cd portfolio-backend
   npm start
   ```

2. **Check the console output:**
   - You should see: `✅ Database connection established`
   - If you see an error, check your `.env` file values

3. **Test API endpoints:**
   ```bash
   # Test blog posts endpoint
   curl http://localhost:5000/api/blogs
   
   # Or open in browser
   http://localhost:5000/api/blogs
   ```

## 🔒 Step 7: Security Notes

1. **Never commit `.env` file** to Git (it should already be in `.gitignore`)
2. **Railway automatically uses SSL** - your connection is encrypted
3. **Keep your password secure** - Railway passwords are auto-generated and strong
4. **Use Railway's environment variables** if deploying backend to Railway too

## 🚨 Troubleshooting

### Connection Timeout
- Check that `DB_HOST` is correct (should be from Railway Variables tab)
- Verify `DB_PORT` is `3306`
- Ensure `DB_SSL=true` is set

### Authentication Failed
- Double-check `DB_USER` (usually `root`)
- Verify `DB_PASSWORD` matches Railway's `MYSQLPASSWORD`
- Make sure there are no extra spaces in your `.env` file

### Database Not Found
- Verify `DB_NAME` matches Railway's `MYSQLDATABASE` (usually `railway`)
- Make sure you've imported the schema files

### SSL Connection Error
- Ensure `DB_SSL=true` in your `.env`
- Railway requires SSL for remote connections

## 📊 Railway Free Tier Limits

- **$5 credit per month** (free tier)
- **512 MB RAM, 1 vCPU**
- **1 GB disk space**
- **2 free service domains**

For a small portfolio/blog project, this should be more than enough!

## 🎯 Next Steps

1. ✅ Database is set up and connected
2. ✅ Test your API endpoints
3. ✅ Deploy your backend to Railway (optional) for a complete cloud setup
4. ✅ Update your frontend API URLs if deploying backend

## 💡 Pro Tips

- **Monitor usage** in Railway dashboard to stay within free tier
- **Set up backups** - Railway provides automatic backups on paid plans
- **Use Railway's environment variables** if deploying backend there too
- **Check Railway logs** if you encounter any issues

---

**Need help?** Check Railway's documentation: https://docs.railway.app/databases/mysql
