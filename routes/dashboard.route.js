const express=require("express");
const dashboardControllar = require("../controllar/dashboardControllar");
const verifyToken = require("../middleware/verifyToken");
const verifyAdminstation = require("../middleware/verifyAdminstration");


const dashboardRouter=express.Router()

dashboardRouter.get("/",verifyToken,verifyAdminstation.verifyAdmin,dashboardControllar.homeData)
// dashboardRouter.get("/activites",dashboardControllar.activity)


module.exports=dashboardRouter