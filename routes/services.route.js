const express = require("express");
const ServicesControllar = require("../controllar/ServicesControllar");

servicesRouter = express.Router();

servicesRouter.get("/:name", ServicesControllar.getServicesPage);
servicesRouter.post("/", ServicesControllar.createService);

module.exports = servicesRouter;
