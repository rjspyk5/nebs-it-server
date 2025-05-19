const express = require("express");
const projectControllar = require("../controllar/projectControllar");
const projectsRouter = express.Router();

projectsRouter.get("/", projectControllar.allProjects);
projectsRouter.get("/:id", projectControllar.allProjects);
projectsRouter.post("/", projectControllar.createProjects);
projectsRouter.put("/:slug", projectControllar.editProjects);
projectsRouter.delete("/:slug", projectControllar.deleteProjects);

module.exports = projectsRouter;
