const Blogs = require("../model/blogsModel");
const database = require("../services/database");

const blogsControllar = {
  allBlogs: async (req, res, next) => {
    try {
      const result = await Blogs.find();
      return res.send({
        message: "Blogs data retrive Successfully",
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  singleBlog: async (req, res, next) => {
    const id = req.params.id;

    try {
      const result = await Blogs.findOne({ _id: id });

      res.status(200).send({
        success: true,
        data: result,
        message: `Data retrive successfully `,
      });
    } catch (error) {
      next(error);
    }
  },
  createBlog: async (req, res, next) => {
    const data = req.body;
    try {
      const result = await database.create(Blogs, data);
      res.status(200).send({
        success: true,
        message: "Blogs data retrive successfully",
        blogId: result?._id,
      });
    } catch (error) {
      next(error);
    }
  },

  editBlog: async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    try {
      const result = await database.update(Blogs, { _id: id }, data);

      res.status(200).send({
        success: true,
        message: "Blog Update Successfully",
        data: result.modifiedCount,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteblog: async (req, res, next) => {
    const id = req.params.id;

    try {
      const result = await Blogs.deleteOne({ _id: id });

      res.status(200).send({
        success: true,
        message: "Delete Successfully",
        data: result.deletedCount,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = blogsControllar;
