const Blogs = require("../model/blogsModel");

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
  singleBlog: async (req, res, next) => {},
  createBlog: async (req, res, next) => {},
  editBlog: async (req, res, next) => {},
  deleteblog: async (req, res, next) => {},
};

module.exports=blogsControllar
