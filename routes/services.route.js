const express = require("express");
const ServicesControllar = require("../controllar/ServicesControllar");

servicesRouter = express.Router();

servicesRouter.get("/:href", ServicesControllar.getServicesPage);
servicesRouter.get("/meta/:href", ServicesControllar.getServicesMeta);
servicesRouter.get("/", ServicesControllar.getServicesPage);
servicesRouter.post("/", ServicesControllar.createService);
servicesRouter.put("/:id", ServicesControllar.updateService);
servicesRouter.post("/:id", ServicesControllar.deleteService);

module.exports = servicesRouter;
