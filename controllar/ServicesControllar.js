const Services = require("../model/ServicesModel");
const { create } = require("../model/userModel");
const { update } = require("../services/database");

const ServicesControllar = {
  getServicesPage: async (req, res) => {
    const href = req.params.href;

    if (!href) {
      return res.status(400).json({ message: "href parameter is required" });
    }
    try {
      const service = await Services.findOne({ href: href });
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
      console.log(serviceData);
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
  updateService: async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
      const result = await Services.updateOne({ _id: id }, data);
      if (result.modifiedCount === 0) {
        return res
          .status(404)
          .json({ message: "Service not found or no changes made" });
      }
      res.status(200).send({
        message: "Service updated successfully",
        data: result.modifiedCount,
        success: true,
      });
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  deleteService: async (req, res) => {
    const id = req.params.id;

    try {
      const result = await Services.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(200).send({
        message: "Service deleted successfully",
        data: result.deletedCount,
        success: true,
      });
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = ServicesControllar;
