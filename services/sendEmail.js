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

const sendemail = async (to, subjectTopic, text, cvFile=null) => {
  
  try {
    transporter.sendMail({
      from: '"Nebs It UK" <nebsdev1@gmail.com>',
      to: to,
      subject: `${subjectTopic}`,
      text: text,
      attachments:cvFile && [
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
