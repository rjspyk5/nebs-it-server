const { verifyAdmin } = require("../middleware/verifyAdminstration");
const verifyToken = require("../middleware/verifyToken");
const Jobs = require("../model/jobsModel");
const database = require("../services/database");

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
};

module.exports = jobsControllar;
