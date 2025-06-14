const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  image: {
    type: String, 
    required: false,
  },
  quote: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,

  },
});
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    shortDesc: {
      type: String,
      required: true,
      trim: true,
    },
    overview: {
      type: String,
      required: true,
      minlength: 500,
      maxlength:700,
    },
    duration: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String, 
      required: true,
    },
    heroVideo: {
      type: String, 
    },
    overviewImage: {
      type: String,
    },
    featureImage: {
      type: String, 
    },
    features: {
      type: [String], // array of features
      validate: [
        (val) => val.length >= 3 && val.length <= 5,
        "Features must be between 3 and 5",
      ],
      required: true,
    },
    gallery: {
      type: [String], 
      validate: [
        (val) => val.length === 5,
        "Exactly 5 gallery images are required.",
      ],
      required: true,
    },
    reviews: {
      type: [reviewSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Projects = mongoose.model("projects", projectSchema);
module.exports = Projects;
