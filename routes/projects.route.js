const express = require("express");
const projectControllar = require("../controllar/projectControllar");
const verifyToken = require("../middleware/verifyToken");
const verifyAdminstation = require("../middleware/verifyAdminstration");
const projectsRouter = express.Router();

projectsRouter.get("/", projectControllar.allProjects);
projectsRouter.get("/:id", projectControllar.singleProject);
projectsRouter.post("/",verifyToken,verifyAdminstation.verifyAdmin, projectControllar.createProjects);
projectsRouter.put("/:id",verifyToken,verifyAdminstation.verifyAdmin, projectControllar.editProjects);
projectsRouter.delete("/:id",verifyToken,verifyAdminstation.verifyAdmin, projectControllar.deleteProjects);

module.exports = projectsRouter;
