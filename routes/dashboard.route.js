const express=require("express");
const dashboardControllar = require("../controllar/dashboardControllar");


const dashboardRouter=express.Router()

dashboardRouter.get("/",dashboardControllar.homeData)
// dashboardRouter.get("/activites",dashboardControllar.activity)


module.exports=dashboardRouter