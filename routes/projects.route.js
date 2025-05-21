const express = require("express");
const projectControllar = require("../controllar/projectControllar");
const projectsRouter = express.Router();

projectsRouter.get("/", projectControllar.allProjects);
projectsRouter.get("/:id", projectControllar.singleProject);
projectsRouter.post("/", projectControllar.createProjects);
projectsRouter.put("/:id", projectControllar.editProjects);
projectsRouter.delete("/:id", projectControllar.deleteProjects);

module.exports = projectsRouter;
