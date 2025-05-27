const express = require("express");
const blogsControllar = require("../controllar/blogsControllar");
const verifyToken = require("../middleware/verifyToken");
const verifyAdminstation = require("../middleware/verifyAdminstration");
const blogsRouter = express.Router();

blogsRouter.get("/", blogsControllar.allBlogs);
blogsRouter.get("/:id", blogsControllar.singleBlog);
blogsRouter.delete("/:id",verifyToken,verifyAdminstation.verifyAdmin, blogsControllar.deleteblog);
blogsRouter.put("/:id",verifyToken,verifyAdminstation.verifyAdmin,blogsControllar.editBlog);
blogsRouter.post("/",verifyToken,verifyAdminstation.verifyAdmin, blogsControllar.createBlog);

module.exports=blogsRouter