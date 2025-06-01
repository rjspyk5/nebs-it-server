const Blogs = require("../model/blogsModel");
const Contact = require("../model/ContactModel");
const Projects = require("../model/projectsModel");
const database = require("../services/database");
const nodemailer = require("nodemailer");
const { sendemail } = require("../services/sendEmail");
const Services = require("../model/ServicesModel");

const othersControllar = {
  contact: async (req, res, next) => {
    const data = req.body;

    const { name, email, mobile, message, budget } = data;
    try {
      const text = `
        Name: ${name}
        Email: ${email}
        Mobile: ${mobile}
        Message: ${message || "N/A"}
        Budget: ${budget || "N/A"}
      `;

      const result = await sendemail(
        process.env.CONTACT_MAIL,
        `Contact Message from :${mobile} `,
        text
      );

      return res.status(200).send({
        message: "Message sent successfully",
        success: true,
        data: result,
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
  getMenu: async (req, res, next) => {
    try {
      const menus = await Services.find({}, { name: 1,slug:1, _id: 0 });
      res.status(200).send({
        success: true,
        data: menus,
        message: "Navigation menu retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = othersControllar;
