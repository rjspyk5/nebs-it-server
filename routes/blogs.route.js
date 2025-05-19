const express = require("express");
const blogsControllar = require("../controllar/blogsControllar");
const blogsRouter = express.Router();

blogsRouter.get("/", blogsControllar.allBlogs);
blogsRouter.get("/:id", blogsControllar.singleBlog);
blogsRouter.delete("/:id", blogsControllar.deleteblog);
blogsRouter.put("/:id", blogsControllar.editBlog);
blogsRouter.post("/", blogsControllar.createBlog);

module.exports=blogsRouter