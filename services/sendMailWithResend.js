const nodemailer = require("nodemailer");

// Create transporter with proper configuration for Brevo
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com", // <-- Brevo's SMTP host
  port: 587, // <-- Brevo's recommended port
  secure: false, // <-- Use false for port 587
  auth: {
    user: process.env.BREVO_USER, // Your Brevo account email
    pass: process.env.BREVO_PASS, // Your Brevo SMTP key
  },
  // Keep the rest of your timeout and pool settings
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000,
  pool: true,
  maxConnections: 5,
  maxMessages: 10,
  debug: process.env.NODE_ENV === "development",
  logger: process.env.NODE_ENV === "development",
});

const sendEmailWithResend = async (to, subjectTopic, text, cvFile = null) => {
  try {
    // Verify transporter connection before sending
    await transporter.verify();
    const mailOptions = {
      from: '"Nebs It" <nebsdev1@gmail.com>', // Important: This "from" email must be a verified sender in your Brevo account!
      to: to,
      subject: subjectTopic,
      text: text,
      html: `<pre style="font-family: Arial, sans-serif; white-space: pre-wrap;">${text}</pre>`,
    };

    if (cvFile) {
      mailOptions.attachments = [
        {
          filename: cvFile.originalname,
          content: cvFile.buffer,
          contentType: cvFile.mimetype,
        },
      ];
    }

    const result = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
    });

    return {
      success: true,
      messageId: result.messageId,
      response: result.response,
    };
  } catch (error) {
    console.error("Email sending error:", error);

    // You can keep these error handlers, as the error codes might be different now
    if (error.code === "ETIMEDOUT") {
      throw new Error("Email service timeout - please try again later");
    } else if (error.code === "ECONNREFUSED") {
      throw new Error("Unable to connect to email server");
    } else if (error.responseCode === 401 || error.responseCode === 535) {
      throw new Error("Brevo authentication failed - check SMTP key/login");
    } else if (error.responseCode === 550) {
      throw new Error("Invalid recipient email address");
    } else {
      throw new Error(`Email sending failed: ${error.message}`);
    }
  }
};

process.on("SIGTERM", () => {
  transporter.close();
  console.log("Email transporter closed");
});

process.on("SIGINT", () => {
  transporter.close();
  console.log("Email transporter closed");
});

module.exports = { sendEmailWithResend };
