const express = require("express");
const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
      metaTitle:{
      type: String,

      trim: true,
    },
    metaDescription:{
      type: String,

      trim: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    dutyTime: {
      type: String,
      required: true,
    },
    vacancy: {
      type: Number,
      default: 1,
      min: 1,
    },
    employmentType: {
      type: String,

      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
    },
    image: {
      type: String,
      default: "https://picsum.photos/300/250",
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    education: {
      type: [String],
      default: [],
    },
    additionalRequirements: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Jobs = mongoose.model("jobs", jobSchema);
module.exports = Jobs;
