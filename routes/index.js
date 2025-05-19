const express = require("express");
const routes = express.Router();
const userRouter = require("./user.routes");
const projectsRouter = require("./projects.route");
const blogsRouter = require("./blogs.route");


routes.get("/", (req, res) => res.send({ message: "Welcome to our server" }));
routes.use("/users", userRouter);
routes.use("/projects",projectsRouter);
routes.use("/blogs",blogsRouter);
exports.routes = routes;
