const { Resend } = require("resend");

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmailWithResend = async (to, subjectTopic, text, cvFile = null) => {
  try {
    // Validate required environment variable
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY environment variable is required");
    }
    // Prepare email data
    const emailData = {
      from: process.env.FROM_EMAIL || "Nebs It <nebsdev1@gmail.com>",
      to: [to],
      subject: subjectTopic,
      text: text,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="border-bottom: 3px solid #007bff; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="color: #333; margin: 0; font-size: 24px;">NEBS IT</h1>
            <p style="color: #666; margin: 5px 0 0 0;">New Job Application Received</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #007bff; margin-top: 0; font-size: 20px; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              ${subjectTopic}
            </h2>
            <pre style="
              background-color: white; 
              padding: 20px; 
              border-radius: 8px; 
              white-space: pre-wrap; 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              border-left: 4px solid #28a745;
              margin: 15px 0;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              line-height: 1.6;
              color: #333;
            ">${text}</pre>
          </div>
          
          ${
            cvFile
              ? `
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <h3 style="color: #856404; margin-top: 0; font-size: 16px;">
                📎 Attachment Included
              </h3>
              <p style="margin-bottom: 0; color: #856404;">
                <strong>CV File:</strong> ${cvFile.originalname}<br>
                <strong>File Type:</strong> ${cvFile.mimetype}<br>
                <strong>File Size:</strong> ${(
                  cvFile.buffer.length / 1024
                ).toFixed(2)} KB
              </p>
            </div>
          `
              : ""
          }
          
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
          
          <div style="text-align: center; color: #6c757d; font-size: 12px;">
            <p style="margin: 5px 0;">This email was automatically generated from the NEBS IT UK job application system.</p>
            <p style="margin: 5px 0;">Sent on ${new Date().toLocaleString(
              "en-GB",
              {
                timeZone: "Europe/London",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            )}</p>
          </div>
        </div>
      `,
    };

    // Add attachment if CV file is provided
    if (cvFile && cvFile.buffer && cvFile.originalname) {
      emailData.attachments = [
        {
          filename: cvFile.originalname,
          content: cvFile.buffer,
        },
      ];
      console.log(
        "Attachment added:",
        cvFile.originalname,
        `(${(cvFile.buffer.length / 1024).toFixed(2)} KB)`
      );
    }

    // Send email using Resend
    const result = await resend.emails.send(emailData);
    console.log(result)
    console.log("Email sent successfully via Resend:", {
      from: to,
      subject: emailData.subject,
      hasAttachment: !!cvFile,

    });

    // Return response in the same format as your original function expected
    return {
      success: true,
 
      response: `Email sent successfully via Resend.`,
    };
  } catch (error) {
    console.error("Resend email sending error:", error);

    // Handle specific Resend errors with user-friendly messages
    let errorMessage = "Email sending failed";

    if (error.message) {
      if (error.message.includes("API key")) {
        errorMessage = "Email service configuration error - Invalid API key";
        console.error(
          "Resend API key issue. Please check RESEND_API_KEY environment variable."
        );
      } else if (error.message.includes("domain")) {
        errorMessage =
          "Email service configuration error - Domain not verified";
        console.error(
          "Resend domain verification issue. Please verify your sending domain in Resend dashboard."
        );
      } else if (error.message.includes("rate limit")) {
        errorMessage =
          "Email service temporarily unavailable - Rate limit exceeded";
        console.error("Resend rate limit exceeded. Please try again later.");
      } else if (error.message.includes("invalid email")) {
        errorMessage = "Invalid recipient email address";
        console.error("Invalid recipient email:", to);
      } else {
        errorMessage = `Email sending failed: ${error.message}`;
      }
    }

    // Throw error to be caught by the calling function (your jobApply controller)
    throw new Error(errorMessage);
  }
};

// Graceful shutdown (not needed for Resend but keeping consistency)
process.on("SIGTERM", () => {
  console.log("Resend email service shutting down gracefully");
});

process.on("SIGINT", () => {
  console.log("Resend email service shutting down gracefully");
});

module.exports = { sendEmailWithResend };
