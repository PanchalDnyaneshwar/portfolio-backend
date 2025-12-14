# Email Configuration - Quick Reference

## ⚡ Quick Setup Checklist

- [ ] Choose email provider (Gmail recommended for testing)
- [ ] Generate App Password or API Key
- [ ] Add credentials to `.env` file
- [ ] Test email connection: `npm start` (should see ✅ Email service configured)
- [ ] Submit test contact form
- [ ] Verify admin receives notification email
- [ ] Verify user receives auto-reply email

## 📝 Required .env Variables

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
ADMIN_EMAIL=your-admin-email@gmail.com
ADMIN_NAME=Dnyaneshwar
```

## 🔑 Provider Quick Settings

### Gmail
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=app-password-from-google
```

### Outlook
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=app-password-from-microsoft
```

### SendGrid
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=SG.your-api-key
```

## ✅ Test Connection

When you start your server, you should see:
```
✅ Email service configured successfully
```

If you see an error, check:
1. All variables are set in `.env`
2. No extra spaces in passwords
3. App password is correct (for Gmail/Outlook)
4. API key is valid (for SendGrid/Brevo)

## 🎨 Email Features

- ✅ Professional HTML email templates
- ✅ Responsive design (mobile-friendly)
- ✅ Auto-reply to users
- ✅ Admin notifications
- ✅ Plain text fallback
- ✅ XSS protection
- ✅ Error handling

## 📚 Full Documentation

See `EMAIL_SETUP_GUIDE.md` for detailed instructions.
