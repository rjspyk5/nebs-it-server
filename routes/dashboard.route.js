const express=require("express");
const dashboardControllar = require("../controllar/dashboardControllar");


const dashboardRouter=express.Router()

dashboardRouter.use("/",dashboardControllar.homeData)

module.exports=dashboardRouter