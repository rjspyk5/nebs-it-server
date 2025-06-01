const express = require("express");
const ServicesControllar = require("../controllar/ServicesControllar");

servicesRouter = express.Router();

servicesRouter.get("/:href", ServicesControllar.getServicesPage);
servicesRouter.get("/", ServicesControllar.getServicesPage);
servicesRouter.post("/", ServicesControllar.createService);
servicesRouter.put("/:id", ServicesControllar.createService);
servicesRouter.post("/:id", ServicesControllar.createService);

module.exports = servicesRouter;
