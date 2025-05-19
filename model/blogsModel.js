const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    contentHtml: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: "",
    },
    heroVideo: {
      type: String,
      default: "",
    },
    readingTime: {
      type: String,
      default: "1 minute",
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
  },
  {
    timestamps: true,
  }
);

const Blogs = mongoose.model("blogs", blogsSchema);
module.exports = Blogs;
