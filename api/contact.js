import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const {
      name,
      email,
      websiteUrl,
      platform = 'web',
      selectedPackage = 'mini-audit',
      primaryGoal = 'compliance',
      message = '',
      bot_field,
    } = req.body || {};

    // 2. Honeypot check for spam bots
    if (bot_field) {
      return res.status(200).json({ success: true, message: 'Request received' });
    }

    // 3. Server-side validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Name is required.' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Valid email address is required.' });
    }
    if (!websiteUrl || !websiteUrl.trim()) {
      return res.status(400).json({ success: false, error: 'Website or App URL is required.' });
    }

    // 4. Construct Email Details
    const recipientEmail = process.env.TO_EMAIL || process.env.GMAIL_USER || 'rscott.sites@gmail.com';
    const gmailUser = process.env.GMAIL_USER || recipientEmail;
    const gmailAppPass = process.env.GMAIL_APP_PASS || process.env.GMAIL_APP_PASSWORD;
    const resendKey = process.env.RESEND_API_KEY;
    const web3Key = process.env.WEB3FORMS_KEY;

    const emailSubject = `[Mini-Audit Request] ${name.trim()} - ${platform.toUpperCase()}`;

    const emailText = `
New Free Mini-Audit Request from RScott Sites Website

Submitted Details:
- Name: ${name.trim()}
- Email: ${email.trim()}
- Website/App URL: ${websiteUrl.trim()}
- Platform Type: ${platform}
- Service Package Interest: ${selectedPackage}
- Primary Objective: ${primaryGoal}
- Additional Message: ${message.trim() || 'None provided.'}
    `.trim();

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; color: #1E140A; max-width: 600px; margin: 0 auto; border: 1px solid #C8B89A; border-radius: 8px; padding: 24px; background-color: #FAF7F2;">
        <h2 style="color: #7A5C1E; border-bottom: 2px solid #7A5C1E; padding-bottom: 8px;">New Mini-Audit Request</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 180px;">Client Name:</td>
            <td style="padding: 8px 0;">${escapeHtml(name.trim())}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Work Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email.trim())}" style="color: #7A5C1E;">${escapeHtml(email.trim())}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Website / App URL:</td>
            <td style="padding: 8px 0;"><a href="${escapeHtml(websiteUrl.trim())}" target="_blank" style="color: #7A5C1E;">${escapeHtml(websiteUrl.trim())}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Platform Type:</td>
            <td style="padding: 8px 0;">${escapeHtml(platform)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Package Interest:</td>
            <td style="padding: 8px 0;">${escapeHtml(selectedPackage)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Primary Goal:</td>
            <td style="padding: 8px 0;">${escapeHtml(primaryGoal)}</td>
          </tr>
        </table>
        ${
          message.trim()
            ? `<div style="margin-top: 20px; padding: 16px; background-color: #EDE6D9; border-radius: 6px;">
                 <strong>Additional Details:</strong>
                 <p style="margin: 8px 0 0 0; white-space: pre-wrap;">${escapeHtml(message.trim())}</p>
               </div>`
            : ''
        }
      </div>
    `;

    // 5. Priority 1: Gmail SMTP via Nodemailer
    if (gmailAppPass) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailAppPass.replace(/\s+/g, ''), // Strip spaces if copied from Google UI
        },
      });

      const mailOptions = {
        from: `"RScott Sites Form" <${gmailUser}>`,
        to: recipientEmail,
        replyTo: email.trim(),
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      };

      const info = await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true, messageId: info.messageId });
    }

    // Priority 2: Resend API
    if (resendKey) {
      const senderEmail = process.env.FROM_EMAIL || 'RScott Sites <onboarding@resend.dev>';
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [recipientEmail],
          reply_to: email.trim(),
          subject: emailSubject,
          html: emailHtml,
          text: emailText,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Resend API error');
      }
      return res.status(200).json({ success: true, id: data.id });
    }

    // Priority 3: Web3Forms API
    if (web3Key) {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          subject: emailSubject,
          from_name: name.trim(),
          email: email.trim(),
          to_email: recipientEmail,
          message: emailText,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Web3Forms error');
      }
      return res.status(200).json({ success: true, id: data.result?.id });
    }

    // Dev / fallback notice if no key is configured yet
    return res.status(200).json({
      success: true,
      message: 'Form submission received (notice: add GMAIL_APP_PASS to Vercel environment variables for live Gmail dispatch)',
    });
  } catch (err) {
    console.error('Server error processing contact form:', err);
    return res.status(500).json({ success: false, error: err.message || 'Internal server error' });
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
