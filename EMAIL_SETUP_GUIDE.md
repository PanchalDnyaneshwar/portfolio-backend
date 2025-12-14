# Professional Email Setup Guide

Complete guide to configure professional SMTP email for your portfolio contact form.

## 📧 Required Environment Variables

Add these to your `portfolio-backend/.env` file:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com

# Admin Configuration
ADMIN_EMAIL=your-admin-email@gmail.com
ADMIN_NAME=Dnyaneshwar
```

## 🚀 Setup Instructions by Provider

### Option 1: Gmail (Recommended for Testing)

Gmail is free and easy to set up for development and small projects.

#### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com
2. Navigate to **Security** → **2-Step Verification**
3. Enable 2-Step Verification if not already enabled

#### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select **Mail** and **Other (Custom name)**
3. Enter "Portfolio Contact Form"
4. Click **Generate**
5. Copy the 16-character password (no spaces)

#### Step 3: Update .env File
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  # Your app password (remove spaces)
EMAIL_FROM=your-email@gmail.com
ADMIN_EMAIL=your-email@gmail.com
ADMIN_NAME=Dnyaneshwar
```

**Note:** Use port `587` for TLS or `465` for SSL. The configuration automatically detects this.

---

### Option 2: Outlook/Hotmail

#### Step 1: Enable App Passwords
1. Go to: https://account.microsoft.com/security
2. Enable **Two-step verification**
3. Go to **Security** → **Advanced security options**
4. Click **Create a new app password**
5. Name it "Portfolio Contact Form"
6. Copy the generated password

#### Step 2: Update .env File
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@outlook.com
ADMIN_EMAIL=your-email@outlook.com
ADMIN_NAME=Dnyaneshwar
```

---

### Option 3: SendGrid (Free Tier: 100 emails/day)

SendGrid is great for production with better deliverability.

#### Step 1: Create SendGrid Account
1. Sign up at: https://sendgrid.com
2. Verify your email address
3. Complete account setup

#### Step 2: Create API Key
1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Name it "Portfolio Contact Form"
4. Select **Full Access** or **Restricted Access** (Mail Send permissions)
5. Copy the API key (you'll only see it once!)

#### Step 3: Update .env File
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=SG.xxxxxxxxxxxxxxxxxxxxx  # Your SendGrid API key
EMAIL_FROM=your-verified-email@domain.com
ADMIN_EMAIL=your-admin-email@domain.com
ADMIN_NAME=Dnyaneshwar
```

**Important:** 
- `EMAIL_USER` must be exactly `apikey`
- `EMAIL_PASS` is your SendGrid API key
- `EMAIL_FROM` must be a verified sender in SendGrid

---

### Option 4: Brevo (formerly Sendinblue) - Free Tier: 300 emails/day

#### Step 1: Create Account
1. Sign up at: https://www.brevo.com
2. Verify your email
3. Go to **SMTP & API** → **SMTP**

#### Step 2: Get SMTP Credentials
1. Copy your SMTP server, port, and login
2. Create an SMTP key if needed

#### Step 3: Update .env File
```env
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=your-brevo-email@example.com
EMAIL_PASS=your-smtp-key
EMAIL_FROM=your-verified-email@domain.com
ADMIN_EMAIL=your-admin-email@domain.com
ADMIN_NAME=Dnyaneshwar
```

---

### Option 5: Mailgun (Free Tier: 5,000 emails/month for 3 months)

#### Step 1: Create Account
1. Sign up at: https://www.mailgun.com
2. Verify your domain or use sandbox domain for testing

#### Step 2: Get SMTP Credentials
1. Go to **Sending** → **Domain Settings**
2. Click on your domain
3. Go to **SMTP credentials** tab
4. Copy SMTP hostname, port, username, and password

#### Step 3: Update .env File
```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=postmaster@your-domain.mailgun.org
EMAIL_PASS=your-mailgun-password
EMAIL_FROM=noreply@your-domain.com
ADMIN_EMAIL=your-admin-email@domain.com
ADMIN_NAME=Dnyaneshwar
```

---

### Option 6: Custom SMTP Server

If you have your own SMTP server:

```env
EMAIL_HOST=mail.yourdomain.com
EMAIL_PORT=587  # or 465 for SSL
EMAIL_USER=your-username
EMAIL_PASS=your-password
EMAIL_FROM=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_NAME=Dnyaneshwar
```

**Note:** Port `465` uses SSL (secure), port `587` uses TLS. The configuration automatically detects this.

---

## ✅ Testing Your Email Configuration

### Step 1: Start Your Server
```bash
cd portfolio-backend
npm start
```

### Step 2: Check Console Output
You should see:
```
✅ Email service configured successfully
✅ Database connection established
```

If you see an error, check:
- All environment variables are set correctly
- No extra spaces in passwords
- App password/API key is correct
- 2FA is enabled (for Gmail/Outlook)

### Step 3: Test Contact Form
1. Submit a test message through your contact form
2. Check your `ADMIN_EMAIL` inbox for the notification
3. Check the sender's email for the auto-reply

---

## 🔒 Security Best Practices

1. **Never commit `.env` file** to Git (should be in `.gitignore`)
2. **Use App Passwords** instead of your main account password
3. **Rotate passwords** regularly
4. **Use environment variables** in production (Railway, Heroku, etc.)
5. **Enable 2FA** on your email account
6. **Use strong passwords** for email accounts

---

## 🚨 Troubleshooting

### "Email configuration error" on startup

**Possible causes:**
- Missing environment variables
- Incorrect SMTP credentials
- Network/firewall blocking port

**Solutions:**
1. Check all required variables are set in `.env`
2. Verify credentials are correct (no extra spaces)
3. Test SMTP connection manually:
   ```bash
   # Install mailutils for testing
   # Then test with: telnet smtp.gmail.com 587
   ```

### "Failed to send email" error

**Possible causes:**
- Invalid credentials
- App password not generated (Gmail)
- Sender email not verified (SendGrid)
- Rate limiting

**Solutions:**
1. **Gmail:** Make sure you're using an App Password, not your regular password
2. **SendGrid:** Verify sender email in SendGrid dashboard
3. **Rate limiting:** Check if you've exceeded free tier limits
4. **Check logs:** Look for specific error messages in console

### Emails going to spam

**Solutions:**
1. **Use a professional email service** (SendGrid, Mailgun) for better deliverability
2. **Verify your domain** with SPF/DKIM records
3. **Use a custom domain** email address
4. **Avoid spam trigger words** in subject/content
5. **Warm up your IP** if using a new service

### Connection timeout

**Solutions:**
1. Check firewall isn't blocking ports 587/465
2. Try different port (587 vs 465)
3. Verify SMTP hostname is correct
4. Check if your network allows SMTP connections

---

## 📊 Email Provider Comparison

| Provider | Free Tier | Best For | Setup Difficulty |
|----------|-----------|----------|------------------|
| Gmail | Unlimited* | Development/Testing | ⭐ Easy |
| Outlook | Unlimited* | Development/Testing | ⭐ Easy |
| SendGrid | 100/day | Production | ⭐⭐ Medium |
| Brevo | 300/day | Small Projects | ⭐⭐ Medium |
| Mailgun | 5,000/month (3 months) | Production | ⭐⭐⭐ Advanced |
| Custom SMTP | Varies | Enterprise | ⭐⭐⭐ Advanced |

*Gmail/Outlook have daily sending limits (~500 emails/day for free accounts)

---

## 🎯 Recommended Setup

**For Development:**
- Use **Gmail** with App Password (easiest setup)

**For Production:**
- Use **SendGrid** or **Brevo** (better deliverability, analytics)
- Verify your domain for professional appearance
- Set up SPF/DKIM records

---

## 💡 Pro Tips

1. **Test emails first** before deploying to production
2. **Monitor email logs** in your provider dashboard
3. **Set up email alerts** for failed deliveries
4. **Use a dedicated email** for contact forms (not personal)
5. **Keep backups** of your `.env` file (securely!)
6. **Update passwords** if you suspect compromise

---

## 📝 Complete .env Example

```env
# Database Configuration (Railway)
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_railway_password
DB_NAME=railway
DB_SSL=true

# Email Configuration (Gmail Example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
EMAIL_FROM=your-email@gmail.com

# Admin Configuration
ADMIN_EMAIL=your-email@gmail.com
ADMIN_NAME=Dnyaneshwar

# Server Configuration
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

---

**Need help?** Check the error messages in your console - they usually point to the specific issue!
