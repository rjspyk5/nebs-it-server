const Blogs = require("../model/blogsModel");
const Jobs = require("../model/jobsModel");
const Projects = require("../model/projectsModel");

// todo:data not coming
const dashboardControllar = {
  homeData: async (req, res, next) => {
    try {
      const totalBlogs = Blogs.countDocuments();
      const totalProjects =Projects.countDocuments();
      const totalJobs = Jobs.countDocuments();
      res
        .status(200)
        .send({
          success: true,
          data: { totalBlogs, totalProjects, totalJobs },
          data: "Data retrive successfully",
        });
    } catch (error) {
      next(error);
    }
  },
};

module.exports=dashboardControllar
