const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Gmail SMTP Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'moses4martin@gmail.com',      // Your Gmail
    pass: 'lxxlmisgqbncbaoa'             // App Password
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

// Home Route
app.get('/', (req, res) => {
  res.send('Inquiry Service is Running...');
});

// Inquiry Form Submission Route
app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const mailOptions = {
    from: '"Synergy Tech Inquiry" <moses4martin@gmail.com>',   // Must be your verified Gmail
    to: 'mosesmartin@synergytechsol.com',                      // Your business email
    subject: 'New Inquiry from Website',
    replyTo: email,                                            // So you can reply directly to sender
    html: `
      <h3>New Inquiry Received</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
      </ul>
      <p><strong>Message:</strong><br/> ${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send inquiry', error: error.message });
  }
});

// Start Server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
