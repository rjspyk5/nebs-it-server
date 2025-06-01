const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema({
  heading: String,
  subheading: String,
});

const ImageSchema = new mongoose.Schema({
  url: String,
  alt: String,
});

const ReviewSchema = new mongoose.Schema({
  quote: String,
  name: String,
  address: String,
});

const FaqItemSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const ServicesPageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    hero: {
      heading: String,
      video: String,
      description: String,
      href: String,
    },
    whatWeOffer: {
      sectionHeading: String,
      subHeading: String,
      image: ImageSchema,
      features: [FeatureSchema],
    },
    designProcess: {
      sectionHeading: String,
      subHeading: String,
      image: ImageSchema,
      features: [FeatureSchema],
    },
    reviews: [ReviewSchema],
    faq: {
      accordion: [FaqItemSchema],
      image: ImageSchema,
    },
  },
  { timestamps: true }
);
const Services = mongoose.model("Services", ServicesPageSchema);

module.exports = Services;
