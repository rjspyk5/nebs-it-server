const express = require("express");
const userRouter = express.Router();
const userControllar = require("../controllar/userControllar");
userRouter.post("/reg", userControllar.register);
userRouter.post("/login", userControllar.login);
userRouter.put("/profile/:id", userControllar.updateProfile);
userRouter.get("/", userControllar.getUsers);

module.exports = userRouter;
