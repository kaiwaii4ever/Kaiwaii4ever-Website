const { Resend } = require('resend');
const dotenv = require('dotenv');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
} else {
  dotenv.config();
}

const resend = new Resend(process.env.RESEND_KEY);

async function sendEmail({ to, subject, html }) {
  try {
    if (!process.env.RESEND_KEY) {
      throw new Error('RESEND_KEY is not configured');
    }

    const data = await resend.emails.send({
      from: 'support@kaiwaii4ever.win',
      to: [to],
      subject: subject,
      html: html,
    });

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

module.exports = { sendEmail };