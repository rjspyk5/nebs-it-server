const mongoose = require("mongoose");
require("dotenv").config();
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Database is running");
  } catch (error) {
    console.dir(error);
  }
};
module.exports = connectDb;
