const express = require("express");
const routes = express.Router();
const userRouter = require("./user.routes");
const jobsRouter = require("./jobs.route");
const projectsRouter = require("./projects.route");
const blogsRouter = require("./blogs.route");
const dashboardRouter = require("./dashboard.route");
const othersRouter = require("./others.route");
const servicesRouter = require("./services.route");

routes.get("/", (req, res) => res.send({ message: "Welcome to our server" }));
routes.use("/users", userRouter);
routes.use("/projects", projectsRouter);
routes.use("/blogs", blogsRouter);
routes.use("/jobs", jobsRouter);
routes.use("/dashboard", dashboardRouter);
routes.use("/others", othersRouter);
routes.use("/services", servicesRouter);
exports.routes = routes;
