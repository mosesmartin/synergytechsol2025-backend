const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Hostinger SMTP Transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,        // SSL port
  secure: true,     // True for SSL
  auth: {
    user: 'mosesmartin@synergytechsol.com',
    pass: 'Johov@H4929@#'  // Use actual email password or generated app password
  }
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Connection Failed:', error);
  } else {
    console.log('SMTP Connected Successfully');
  }
});

// Routes
app.get('/', (req, res) => {
  res.send('Email Service is Running...');
});

app.post('/api/send-email', (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log('Received Payload:', req.body);

  const mailOptions = {
    from: `"${name}" <mosesmartin@synergytechsol.com>`,
    to: 'mosesmartin@synergytechsol.com',
    subject: 'New Inquiry from Website Contact Form',
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Error sending email', error: error.message });
    } else {
      console.log('Email sent:', info.response);
      return res.status(200).json({ success: true, message: 'Email sent successfully' });
    }
  });
});

// Start Server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
