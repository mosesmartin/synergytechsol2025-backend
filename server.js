const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Create transporter globally
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,       // Use 465 for SSL or 587 for TLS
  secure: false,   // True for SSL (465), False for TLS (587)
  auth: {
    user: 'mosesmartin@synergytechsol.com',
    pass: 'Johov@H4929@#'
  }
});

// Verify SMTP connection on app start
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Connection Failed:', error);
  } else {
    console.log('SMTP Connected Successfully');
  }
});

app.get('/', (req, res) => {
  res.send('App is running..');
});

app.post('/api/send-email', (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log('Received Payload:', req.body);

  const mailOptions = {
    from: '"Synergy Tech Sol" <mosesmartin@synergytechsol.com>',
    to: 'mosesmartin@synergytechsol.com',
    subject: 'Synergy Tech Sol - New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Error sending email', error: error.message });
    } else {
      console.log('Email sent:', info.response);
      return res.status(200).json({ success: true, message: 'Email sent successfully', response: info.response });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
