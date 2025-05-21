const express = require("express");
const jobsControllar = require("../controllar/jobsControllar");
jobsRouter = express.Router();

jobsRouter.get("/", jobsControllar.allJobs);
jobsRouter.get("/:id", jobsControllar.singleJob);
jobsRouter.delete("/:id", jobsControllar.deleteJob);
jobsRouter.put("/:id", jobsControllar.updateJob);
jobsRouter.post("/", jobsControllar.createJob);

module.exports = jobsRouter;
