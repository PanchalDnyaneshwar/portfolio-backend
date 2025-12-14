# Railway MySQL - Quick Start Checklist

Follow these steps in order to get your database running on Railway:

## ✅ Checklist

- [ ] **Step 1:** Sign up at https://railway.app
- [ ] **Step 2:** Create new project → Add MySQL database
- [ ] **Step 3:** Copy connection details from Railway Variables tab:
  - `MYSQLHOST` → `DB_HOST`
  - `MYSQLPORT` → `DB_PORT` (usually 3306)
  - `MYSQLUSER` → `DB_USER` (usually root)
  - `MYSQLPASSWORD` → `DB_PASSWORD`
  - `MYSQLDATABASE` → `DB_NAME` (usually railway)
- [ ] **Step 4:** Update `portfolio-backend/.env` file with Railway credentials
- [ ] **Step 5:** Import database schema (choose one method):
  - [ ] Option A: MySQL command line
  - [ ] Option B: Railway MySQL Terminal
  - [ ] Option C: MySQL Workbench
- [ ] **Step 6:** Test connection: `npm start` (should see ✅ Database connection established)
- [ ] **Step 7:** Test API: Visit `http://localhost:5000/api/blogs`

## 📝 Your .env File Should Look Like:

```env
# Railway MySQL Configuration
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_railway_password
DB_NAME=railway
DB_SSL=true

# Other configs
JWT_SECRET=your_jwt_secret
PORT=5000
```

## 🚀 Quick Import Commands

Once you have Railway credentials, run these in your terminal:

```bash
# Navigate to project
cd portfolio-backend

# Import main schema
mysql -h YOUR_RAILWAY_HOST -u root -p railway < sql/schema.sql

# Import blog schema
mysql -h YOUR_RAILWAY_HOST -u root -p railway < sql/blog_schema.sql
```

Replace `YOUR_RAILWAY_HOST` with your actual Railway host from the Variables tab.

## ⚡ Need Help?

See the detailed guide: `RAILWAY_SETUP_GUIDE.md`
