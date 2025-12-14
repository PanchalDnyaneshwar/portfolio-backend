/**
 * Professional Email Templates
 * Clean, responsive HTML email templates for contact form notifications
 */

/**
 * Admin Notification Email Template
 * Sent to admin when a new contact form submission is received
 */
exports.getAdminNotificationTemplate = ({ name, email, subject, message, submissionDate }) => {
  const formattedDate = new Date(submissionDate || new Date()).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px 20px;">
                            <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                                You have received a new message through your portfolio contact form.
                            </p>
                            
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 25px 0; background-color: #f8f9fa; border-radius: 6px; overflow: hidden;">
                                <tr>
                                    <td style="padding: 20px; border-bottom: 1px solid #e9ecef;">
                                        <strong style="color: #667eea; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">From</strong>
                                        <p style="margin: 8px 0 0 0; color: #333333; font-size: 16px; font-weight: 500;">${escapeHtml(name)}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; border-bottom: 1px solid #e9ecef;">
                                        <strong style="color: #667eea; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
                                        <p style="margin: 8px 0 0 0; color: #333333; font-size: 16px;">
                                            <a href="mailto:${escapeHtml(email)}" style="color: #667eea; text-decoration: none;">${escapeHtml(email)}</a>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; border-bottom: 1px solid #e9ecef;">
                                        <strong style="color: #667eea; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Subject</strong>
                                        <p style="margin: 8px 0 0 0; color: #333333; font-size: 16px; font-weight: 500;">${escapeHtml(subject)}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px;">
                                        <strong style="color: #667eea; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message</strong>
                                        <div style="margin: 8px 0 0 0; color: #333333; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${escapeHtml(message)}</div>
                                    </td>
                                </tr>
                            </table>
                            
                            <div style="margin-top: 25px; padding: 15px; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid #667eea;">
                                <p style="margin: 0; color: #666666; font-size: 13px;">
                                    <strong>Submitted:</strong> ${formattedDate}
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0; color: #999999; font-size: 12px;">
                                This is an automated notification from your portfolio contact form.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `.trim();
};

/**
 * Auto-Reply Email Template
 * Sent to user as confirmation when they submit the contact form
 */
exports.getAutoReplyTemplate = ({ name, subject, message, adminName = "Dnyaneshwar" }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Contacting Me</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Thank You, ${escapeHtml(name)}!</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 20px;">
                            <p style="margin: 0 0 20px 0; color: #333333; font-size: 18px; line-height: 1.6;">
                                I've received your message and truly appreciate you taking the time to reach out.
                            </p>
                            
                            <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                I'll review your message and get back to you as soon as possible, typically within 24-48 hours.
                            </p>
                            
                            <!-- Message Summary -->
                            <div style="margin: 30px 0; padding: 20px; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid #667eea;">
                                <p style="margin: 0 0 10px 0; color: #667eea; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Your Message Summary</p>
                                <p style="margin: 5px 0; color: #333333; font-size: 15px;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
                                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e9ecef;">
                                    <p style="margin: 0 0 8px 0; color: #666666; font-size: 13px; font-weight: 600;">Message:</p>
                                    <p style="margin: 0; color: #333333; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(message)}</p>
                                </div>
                            </div>
                            
                            <p style="margin: 30px 0 0 0; color: #333333; font-size: 16px; line-height: 1.6;">
                                Best regards,<br>
                                <strong style="color: #667eea;">${escapeHtml(adminName)}</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 25px 20px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0 0 10px 0; color: #999999; font-size: 12px; line-height: 1.6;">
                                This is an automated confirmation email. Please do not reply to this message.
                            </p>
                            <p style="margin: 0; color: #999999; font-size: 11px;">
                                If you have any urgent inquiries, please contact me directly through my portfolio website.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `.trim();
};

/**
 * Helper function to escape HTML and prevent XSS
 */
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}
