const express = require("express");
const userControllar = require("../controllar/userControllar");
const userRouter = express.Router();

userRouter.post("/reg", userControllar.register);
userRouter.post("/login", userControllar.login);
userRouter.put("/profile/:id", userControllar.updateProfile);
userRouter.get("/", userControllar.getUsers);

module.exports = userRouter;
