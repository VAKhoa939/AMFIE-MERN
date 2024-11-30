const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD 
  }
});

const mailOptions = {
  from: process.env.EMAIL_USERNAME, 
  to: 'recipient@example.com',
  subject: 'Test Email', 
  text: 'This is a test email sent via SMTP using Gmail.'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error occurred:', error);
  }
  console.log('Email sent:', info.response);
});
