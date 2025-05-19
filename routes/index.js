const express = require("express");
const userRouter = require("./user.routes");
const routes = express.Router();
routes.get("/", (req, res) => res.send({ message: "Welcome to our server" }));
routes.use("/users", userRouter);
exports.routes = routes;
