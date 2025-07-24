const { verifyAdmin } = require("../middleware/verifyAdminstration");
const verifyToken = require("../middleware/verifyToken");
const Jobs = require("../model/jobsModel");
const database = require("../services/database");
const { sendemail } = require("../services/sendEmail");

const jobsControllar = {
  allJobs: async (req, res, next) => {
    try {
      const result = await Jobs.find().sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        message: "Jobs Data Retrive Successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  singleJob: async (req, res, next) => {
    const id = req.params.id;
    const meta = req.query.meta;

    try {
      const result = await Jobs.findOne({ _id: id },meta ? { metaTitle: 1, metaDescription: 1 } : {});

      res.status(200).send({
        success: true,
        message: "Data retrive successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  createJob: async (req, res, next) => {
    const data = req.body;

    try {
      const result = await Jobs.create(data);
      res.status(200).send({
        message: "Jobs create successfully",
        success: true,
        data: result._id,
      });
    } catch (error) {
      next(error);
    }
  },
  updateJob: async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    try {
      const result = await Jobs.updateOne({ _id: id }, data);
      res.status(200).send({
        message: "Update successfully",
        data: result.modifiedCount,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteJob: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Jobs.deleteOne({ _id: id });
      res.status(200).send({
        message: "Delete successfully",
        data: result.deletedCount,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
  jobApply: async (req, res, next) => {
    const { name, email, mobile, location, position, message } = req.body;
    console.log(position)

    const cvFile = req.file;

    if (!cvFile) {
      return res.status(400).json({ message: "CV is required" });
    }
    const text = `
        Name: ${name}
        Email: ${email}
        Mobile: ${mobile}
        Location: ${location || "N/A"}
        Position: ${position}
        Message: ${message || "N/A"}
      `;

    try {
      const result = await sendemail(
        process.env.CARRIER_MAIL,
        `Job Application :${position} - ${name} `,
        text,
        cvFile
      );

      return res.status(200).send({
        message: "Job application sent successfully",
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to send email" });
    }
  },
  openJobs: async (req, res, next) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const result = await database.find(Jobs, {
        status: "Open",
        deadline: { $gte: today },
      });

      res.status(200).send({
        success: true,
        message: "Open Jobs Data Retrieved Successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = jobsControllar;
