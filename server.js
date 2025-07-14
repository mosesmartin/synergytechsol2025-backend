const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Gmail Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'moses4martin@gmail.com',
    pass: 'lxxlmisgqbncbaoa'  // App Password here
  }
});

// Verify SMTP Connection
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Connection Failed:', error);
  } else {
    console.log('SMTP Connected Successfully');
  }
});

// Routes
app.get('/', (req, res) => {
  res.send('App is running...');
});

app.post('/api/send-email', (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log('Received Payload:', req.body);

  const mailOptions = {
    from: '"Synergy Tech Sol" <moses4martin@gmail.com>',
    to: 'moses4martin@gmail.com',
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

// Start Server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
