const express = require("express");
const jobsControllar = require("../controllar/jobsControllar");
const verifyToken = require("../middleware/verifyToken");
const verifyAdminstation = require("../middleware/verifyAdminstration");
const upload = require("../services/multerConfig");
jobsRouter = express.Router();

jobsRouter.get("/", jobsControllar.allJobs);
jobsRouter.get("/:id", jobsControllar.singleJob);
jobsRouter.post("/apply",upload.single("cv"), jobsControllar.jobApply);
jobsRouter.delete("/:id",verifyToken,verifyAdminstation.verifyAdmin,jobsControllar.deleteJob);
jobsRouter.put("/:id",verifyToken,verifyAdminstation.verifyAdmin, jobsControllar.updateJob);
jobsRouter.post("/",verifyToken,verifyAdminstation.verifyAdmin, jobsControllar.createJob);

module.exports = jobsRouter;
