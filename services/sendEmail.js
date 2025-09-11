const nodemailer = require("nodemailer");

// Create transporter with proper configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Remove duplicate secure property, use false for port 587
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
  // Add timeout configurations
  connectionTimeout: 60000, // 60 seconds
  greetingTimeout: 30000,   // 30 seconds
  socketTimeout: 60000,     // 60 seconds
  // Add these for better reliability
  pool: true,
  maxConnections: 5,
  maxMessages: 10,
  debug: process.env.NODE_ENV === 'development', // Enable debug in development
  logger: process.env.NODE_ENV === 'development',
});

const sendemail = async (to, subjectTopic, text, cvFile = null) => {
  try {
    // Verify transporter connection before sending
    await transporter.verify();
    console.log('SMTP server connection verified');

    const mailOptions = {
      from: '"Nebs It" <nebsdev1@gmail.com>',
      to: to,
      subject: subjectTopic,
      text: text,
      html: `<pre style="font-family: Arial, sans-serif; white-space: pre-wrap;">${text}</pre>`, // Add HTML version
    };

    // Add attachment if provided
    if (cvFile) {
      mailOptions.attachments = [
        {
          filename: cvFile.originalname,
          content: cvFile.buffer,
          contentType: cvFile.mimetype,
        },
      ];
    }

    // Send email and await the result
    const result = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected
    });

    return {
      success: true,
      messageId: result.messageId,
      response: result.response
    };

  } catch (error) {
    console.error('Email sending error:', error);
    
    // Handle specific error types
    if (error.code === 'ETIMEDOUT') {
      throw new Error('Email service timeout - please try again later');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Unable to connect to email server');
    } else if (error.code === 'EAUTH') {
      throw new Error('Email authentication failed - check credentials');
    } else if (error.responseCode === 550) {
      throw new Error('Invalid recipient email address');
    } else {
      throw new Error(`Email sending failed: ${error.message}`);
    }
  }
};

// Graceful shutdown
process.on('SIGTERM', () => {
  transporter.close();
  console.log('Email transporter closed');
});

process.on('SIGINT', () => {
  transporter.close();
  console.log('Email transporter closed');
});

module.exports = { sendemail };