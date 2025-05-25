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
    required: true,
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
      maxlength: 800,
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
      type: String, // will store file path or cloud URL
      required: true,
    },
    heroVideo: {
      type: String, // optional video path or URL
    },
    overviewImage: {
      type: String, // optional image path or URL
    },
    featureImage: {
      type: String, // optional image path or URL
    },
    features: {
      type: [String], // array of features
      validate: [
        (val) => val.length >= 5 && val.length <= 9,
        "Features must be between 5 and 9",
      ],
      required: true,
    },
    gallery: {
      type: [String], // paths or URLs of 5 images
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
