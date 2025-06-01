const Services = require("../model/ServicesModel");
const { create } = require("../model/userModel");

const ServicesControllar = {
  getServicesPage: async (req, res) => {
    const name = req.params.name;

    if (!name) {
      return res.status(400).json({ message: "Name parameter is required" });
    }
    try {
      const service = await Services.findOne({ name: name });
      if (!service) {
        return res
          .status(404)
          .json({ message: "Service not found", data: service, success: true });
      }
      res.status(200).send({
        message: "Service fetched successfully",
        data: service,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  createService: async (req, res) => {
    try {
      const serviceData = req.body;
      const newService = await Services.create(serviceData);
      if (!newService) {
        return res.status(400).json({ message: "Failed to create service" });
      }

      res.status(201).send({
        message: "Service created successfully",
        data: newService,
        success: true,
      });
    } catch (error) {
      console.error("Error creating service:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = ServicesControllar;
