# Local Database Setup Guide

Complete guide to set up and use MySQL database locally for development.

## ✅ Quick Setup

### Step 1: Install MySQL

**Windows:**
1. Download MySQL Installer: https://dev.mysql.com/downloads/installer/
2. Choose "Developer Default" or "Server only"
3. Set root password during installation
4. Complete the installation

**Or using Chocolatey:**
```bash
choco install mysql
```

**macOS:**
```bash
brew install mysql
brew services start mysql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

### Step 2: Create Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE IF NOT EXISTS portfolio_db;
```

Or use command line:
```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS portfolio_db;"
```

### Step 3: Update .env File

Create or update `portfolio-backend/.env` file:

```env
# Local Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_root_password
DB_NAME=portfolio_db
DB_SSL=false

# Email Configuration (Optional - for contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
ADMIN_EMAIL=your-admin-email@gmail.com
ADMIN_NAME=Dnyaneshwar

# Server Configuration
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

**Important:**
- Replace `your_mysql_root_password` with your actual MySQL root password
- Set `DB_SSL=false` for local database
- Email configuration is optional but recommended

### Step 4: Import Database Schema

Run these commands in your terminal:

```bash
cd portfolio-backend

# Import main schema
mysql -u root -p portfolio_db < sql/schema.sql

# Import blog schema
mysql -u root -p portfolio_db < sql/blog_schema.sql
```

Or using MySQL Workbench:
1. Open MySQL Workbench
2. Connect to local MySQL server
3. Select `portfolio_db` database
4. File → Open SQL Script → Select `sql/schema.sql` → Execute
5. File → Open SQL Script → Select `sql/blog_schema.sql` → Execute

### Step 5: Test Connection

Start your server:
```bash
npm start
```

You should see:
```
✅ Database connection established
✅ Email service configured successfully  (if email is configured)
```

## 🔍 Verify Database Setup

### Check Tables

Connect to MySQL and verify tables exist:

```sql
USE portfolio_db;
SHOW TABLES;
```

You should see:
- `admin_users`
- `contacts`
- `projects`
- `skills`
- `about`
- `work_experience`
- `users`
- `blog_posts`
- `blog_categories`
- `blog_tags`
- `blog_post_tags`

### Test API Endpoints

```bash
# Test blog posts
curl http://localhost:5000/api/blogs

# Test projects
curl http://localhost:5000/api/projects

# Test contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"Test","message":"This is a test message"}'
```

## 🚨 Troubleshooting

### "Database connection failed"

**Possible causes:**
1. MySQL service not running
2. Wrong password
3. Database doesn't exist
4. Wrong port

**Solutions:**

**Windows:**
```bash
# Check if MySQL is running
net start MySQL80  # or MySQL, MySQL57, etc.

# Or check Services: Win+R → services.msc → Find MySQL
```

**macOS:**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo systemctl start mysql
# or
sudo service mysql start
```

**Verify connection:**
```bash
mysql -u root -p
# Enter password, should connect successfully
```

### "Access denied for user"

- Check `DB_USER` and `DB_PASSWORD` in `.env`
- Make sure password has no extra spaces
- Try resetting MySQL root password if needed

### "Unknown database 'portfolio_db'"

- Create the database: `CREATE DATABASE portfolio_db;`
- Or update `DB_NAME` in `.env` to match existing database

### Port 3306 already in use

- Check if another MySQL instance is running
- Change port in MySQL config or use different port in `.env`

## 📝 Common Commands

### Start MySQL Service

**Windows:**
```bash
net start MySQL80
```

**macOS:**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo systemctl start mysql
```

### Stop MySQL Service

**Windows:**
```bash
net stop MySQL80
```

**macOS:**
```bash
brew services stop mysql
```

**Linux:**
```bash
sudo systemctl stop mysql
```

### Access MySQL Command Line

```bash
mysql -u root -p
```

### Reset Root Password

**Windows:**
1. Stop MySQL service
2. Create `reset.txt` with: `ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword';`
3. Start MySQL with: `mysqld --init-file=C:/reset.txt`
4. Delete `reset.txt`

**macOS/Linux:**
```bash
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword';
FLUSH PRIVILEGES;
EXIT;
```

## ✅ Configuration Checklist

- [ ] MySQL installed and running
- [ ] Database `portfolio_db` created
- [ ] Schema files imported (`schema.sql` and `blog_schema.sql`)
- [ ] `.env` file configured with local database settings
- [ ] `DB_SSL=false` set in `.env`
- [ ] Server starts without errors
- [ ] API endpoints respond correctly

## 🎯 Next Steps

1. ✅ Database is set up locally
2. ✅ Test your API endpoints
3. ✅ Set up email (optional but recommended)
4. ✅ Start developing!

## 💡 Tips

- **Keep MySQL running** while developing
- **Backup your database** regularly: `mysqldump -u root -p portfolio_db > backup.sql`
- **Use MySQL Workbench** for visual database management
- **Check logs** if you encounter issues: MySQL error logs location varies by OS

---

**Your local database is ready!** 🎉
