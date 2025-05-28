const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  secure: false,
  auth: {
    user: `${process.env.NODEMAILER_USER}`,
    pass: `${process.env.NODEMAILER_PASS}`,
  },
});

const sendemail = async (
  to,
  subjectTopic,
  { name, email, mobile, location, position, message, cvFile }
) => {
  try {
    transporter.sendMail({
      from: '"Job Apply" <rjspyk5@gmail.com>',
      to: to,
      subject: `Job Application: ${subjectTopic}`,
      text: `
        Name: ${name}
        Email: ${email}
        Mobile: ${mobile}
        Location: ${location}
        Position: ${position}
        Message: ${message || "N/A"}
      `,
      attachments: [
        {
          filename: cvFile.originalname,
          content: cvFile.buffer,
          contentType: cvFile.mimetype,
        },
      ],
    });
  } catch (error) {
    return error;
  }
};

module.exports = { sendemail };
