const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
   name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{6,15}$/, "Please enter a valid mobile number (6-15 digits)."],
    },
    budget: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact
