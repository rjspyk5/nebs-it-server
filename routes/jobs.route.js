const express = require("express");
const jobsControllar = require("../controllar/jobsControllar");
const verifyToken = require("../middleware/verifyToken");
const verifyAdminstation = require("../middleware/verifyAdminstration");
jobsRouter = express.Router();

jobsRouter.get("/", jobsControllar.allJobs);
jobsRouter.get("/:id", jobsControllar.singleJob);
jobsRouter.delete("/:id",verifyToken,verifyAdminstation.verifyAdmin,jobsControllar.deleteJob);
jobsRouter.put("/:id",verifyToken,verifyAdminstation.verifyAdmin, jobsControllar.updateJob);
jobsRouter.post("/",verifyToken,verifyAdminstation.verifyAdmin, jobsControllar.createJob);

module.exports = jobsRouter;
