const express = require("express");
const othersRouter = express.Router();
const othersControllar = require("../controllar/OthersControllar");



othersRouter.post("/contact", othersControllar.contact);

module.exports = othersRouter;
