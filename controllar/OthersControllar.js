const Blogs = require("../model/blogsModel");
const Contact = require("../model/ContactModel");
const Projects = require("../model/projectsModel");
const database = require("../services/database");
const nodemailer = require("nodemailer");

const othersControllar = {
  contact: async (req, res, next) => {
    const data = req.body;

    try {
      // 1. Save to Database
      const result = await database.create(Contact, data);

      // 2. Setup Nodemailer Transport
      const transporter = nodemailer.createTransport({
        service: "gmail", // or use SMTP configuration
        auth: {
          user: process.env.NODEMAILER_USER, // use environment variables
          pass: process.env.NODEMAILER_PASS,
        },
      });

      // 3. Email Options
      const mailOptions = {
        from: `"Portfolio Contact" <${process.env.NODEMAILER_USER}>`,
        to: "rjspyk5@gmail.com", // you can also send to yourself or admin
        subject: "New Contact Submission",
        html: `
          <h3>New Contact Message</h3>
          <p><strong>Name:</strong> ${data.fullName || "Not Provided"}</p>
          <p><strong>Email:</strong> ${data.email || "Not Provided"}</p>
          <p><strong>Mobile:</strong> ${data.mobile}</p>
          <p><strong>Budget:</strong> ${data.budget || "Not Provided"}</p>
          <p><strong>Message:</strong> ${data.message || "No message"}</p>
        `,
      };

      // 4. Send Email
      await transporter.sendMail(mailOptions);

      // 5. Respond
      res.status(200).send({
        success: true,
        message: "Contact saved and email sent successfully",
        Id: result?._id,
      });
    } catch (error) {
      next(error);
    }
  },
  home: async (req, res, next) => {
    try {
      const totalProjects = await Projects.countDocuments();
      const latestProjects = await Projects.find().limit(4);
      const latestBlogs = await Blogs.find().limit(4);
      res.status(200).send({
        success: true,
        data: { totalProjects, latestProjects, latestBlogs },
        message: "Data retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = othersControllar;
