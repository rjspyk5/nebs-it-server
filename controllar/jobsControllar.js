const { verifyAdmin } = require("../middleware/verifyAdminstration");
const verifyToken = require("../middleware/verifyToken");
const Jobs = require("../model/jobsModel");
const database = require("../services/database");
const { sendemail } = require("../services/sendEmail");

const jobsControllar = {
  allJobs: async (req, res, next) => {
    try {
      const result = await database.find(Jobs);
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

    try {
      const result = await Jobs.findOne({ _id: id });

      res.status(200).send({
        success: true,
        message: "Data retrive successfully",
        data: result,
      });
    } catch (error) {
      console.log(error, "error");
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
    const cvFile = req.file;

    if (!cvFile) {
      return res.status(400).json({ message: "CV is required" });
    }

    try {
      const result = await sendemail(process.env.CARRIER_MAIL, `Job Application :${position} - ${name} `, {
        name,
        email,
        mobile,
        location,
        position,
        message,
        cvFile,
      });
      return res.status(200).send({
        message: "Job application sent successfully",
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to send email" });
    }
  },
};

module.exports = jobsControllar;
