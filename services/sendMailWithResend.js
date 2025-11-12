const brevo = require("@getbrevo/brevo");

// Initialize a new instance of the API client
const apiInstance = new brevo.TransactionalEmailsApi();

// Set the API key directly on the instance's authentication object
const apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = process.env.BREVO_API;

// The rest of your code remains the same.
// This is the function you export for use in your application.

const sendEmaill = async (to, subjectTopic, text, cvFile = null) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = subjectTopic;
    sendSmtpEmail.htmlContent = `<pre style="font-family: Arial, sans-serif; white-space: pre-wrap;">${text}</pre>`;
    sendSmtpEmail.sender = {
      name: "Nebs It",
      email: "nebsdev1@gmail.com",
    };
    sendSmtpEmail.to = [{ email: to }];

    if (cvFile) {
      sendSmtpEmail.attachment = [
        {
          name: cvFile.originalname,
          content: cvFile.buffer.toString("base64"),
        },
      ];
    }

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    return {
      success: true,
      messageId: result.body.messageId,
      message: "Email process started successfully.",
    };
  } catch (error) {
    console.log(error, "for this user: ", text);

    throw new Error(
      `Email sending failed: ${
        error.response ? error.response.text : error.message
      }`
    );
  }
};

module.exports = { sendEmaill };
