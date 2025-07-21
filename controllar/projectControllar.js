const Projects = require("../model/projectsModel");

const projectControllar = {
  allProjects: async (req, res, next) => {
    const category = req?.query?.category;

    let condition;
    category
      ? (condition = { category: req?.query?.category })
      : (condition = {});

    try {
      const result = await Projects.find(condition, {
        thumbnail: 1,
        category: 1,
        title: 1,
      }).sort({ createdAt: -1 });

      res.status(200).send({
        data: result,
        success: true,
        message: "Projects data retrive successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  singleProject: async (req, res, next) => {
    const id = req.params.id;
    const meta = req.query.meta;
    try {
      const result = await Projects.findOne(
        { _id: id },
        meta ? { metaTitle: 1, metaDescription: 1 } : {}
      );
      res.status(200).send({
        success: true,
        data: result,
        message: "Single Project data retrive successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  createProjects: async (req, res, next) => {
    const data = req.body;

    try {
      const result = await Projects.create(data);
      res.status(200).send({
        success: true,
        message: "Projects created successfuly",
        data: result._id,
      });
    } catch (error) {
      next(error);
    }
  },
  editProjects: async (req, res, next) => {
    const data = req.body;
    const id = req.params.id;

    try {
      const result = await Projects.updateOne({ _id: id }, data, {
        runValidators: true,
      });

      res.status(200).send({
        success: true,
        message: "Blog Update Successfully",
        data: result.modifiedCount,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteProjects: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Projects.deleteOne({ _id: id });
      res.status(200).send({
        success: true,
        message: "Project delete successfully",
        data: result?.deletedCount,
      });
    } catch (error) {
      next(error);
    }
  },
  getProjectsMeta: async (req, res) => {
    const href = req.params.href;
    if (!href) {
      return res.status(400).json({ message: "href parameter is required" });
    }
    try {
      const service = await Projects.findOne(
        { href: href },
        { metaTitle: 1, metaDescription: 1 }
      );

      if (!service) {
        return res
          .status(404)
          .json({ message: "Project not found", data: service, success: true });
      }

      res.status(200).send({
        message: "metadata fetched successfully",
        data: service,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = projectControllar;
