const mongoose = require("mongoose");
require("dotenv").config();

// Connection options for better stability and error handling
const mongoOptions = {
  // Connection timeout settings
  serverSelectionTimeoutMS: 10000, // 10 seconds timeout for server selection
  socketTimeoutMS: 45000, // 45 seconds socket timeout
  connectTimeoutMS: 10000, // 10 seconds connection timeout

  // Connection pool settings
  maxPoolSize: 10, // Maximum number of connections
  minPoolSize: 2, // Minimum number of connections
  maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity

  // Retry settings
  retryWrites: true,

  // Other important options
  heartbeatFrequencyMS: 10000, // Send heartbeat every 10 seconds
};

const connectDb = async () => {
  try {
    // Validate URI exists
    if (!process.env.URI) {
      throw new Error("MongoDB URI not found in environment variables");
    }

    console.log("Attempting to connect to MongoDB...");

    const conn = await mongoose.connect(process.env.URI, mongoOptions);

    console.log(`✅ MongoDB Connected Successfully`);

    // Connection event handlers
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️  MongoDB disconnected. Attempting to reconnect...");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅ MongoDB reconnected successfully");
    });

    mongoose.connection.on("close", () => {
      console.log("🔒 MongoDB connection closed");
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);

    // Log specific error details
    if (error.name === "MongoNetworkError") {
      console.error(
        "🌐 Network Error - Check your internet connection and MongoDB Atlas configuration"
      );
    } else if (error.name === "MongooseServerSelectionError") {
      console.error(
        "🖥️  Server Selection Error - Check if MongoDB cluster is running and accessible"
      );
    }

    // Don't crash the app, retry after delay
    console.log("🔄 Retrying connection in 5 seconds...");
    setTimeout(connectDb, 5000);
  }
};

// Graceful shutdown handling
const gracefulShutdown = async () => {
  try {
    await mongoose.connection.close();
    console.log("🔒 MongoDB connection closed through app termination");
    process.exit(0);
  } catch (error) {
    console.error("Error during graceful shutdown:", error);
    process.exit(1);
  }
};

// Handle process termination
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  gracefulShutdown();
});

module.exports = connectDb;
