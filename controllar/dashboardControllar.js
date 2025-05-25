const Activity = require("../model/ActivityModel");
const Blogs = require("../model/blogsModel");
const Jobs = require("../model/jobsModel");
const Projects = require("../model/projectsModel");

const dashboardControllar = {
  homeData: async (req, res, next) => {
    try {
      const totalBlogs = await Blogs.countDocuments();
      const totalProjects = await Projects.countDocuments();
      const totalJobs = await Jobs.countDocuments();
            const activities = await Activity.find()
        .sort({ actionTime: -1 })
        .limit(5);

      res.status(200).send({
        success: true,
        data: { totalBlogs, totalProjects, totalJobs,activites:activities },
        message: "Data retrive successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  activity: async (req, res, next) => {
    try {
      const activities = await Activity.find()
        .sort({ actionTime: -1 })
        .limit(50);
      return res.status(200).send({ success: true, data: activities });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = dashboardControllar;
