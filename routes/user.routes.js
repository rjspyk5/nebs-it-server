const express = require("express");
const userRouter = express.Router();
const userControllar = require("../controllar/userControllar");
const verifyToken = require("../middleware/verifyToken");
userRouter.post("/reg", userControllar.register);
userRouter.post("/login", userControllar.login);
userRouter.put("/profile/:id", userControllar.updateProfile);
userRouter.get("/", userControllar.getUsers);
userRouter.get("/isAuthenticated", verifyToken,async(req,res)=>res.status(200).send({success:true,user:req.user,message:"User is authenticated"}));

module.exports = userRouter;
