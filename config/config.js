// const mongoose = require("mongoose");
// require("dotenv").config();

// // Connection options for better stability and error handling
// const mongoOptions = {
//   // Connection timeout settings
//   serverSelectionTimeoutMS: 10000, // 10 seconds timeout for server selection
//   socketTimeoutMS: 45000, // 45 seconds socket timeout
//   connectTimeoutMS: 10000, // 10 seconds connection timeout

//   // Connection pool settings
//   maxPoolSize: 10, // Maximum number of connections
//   minPoolSize: 2, // Minimum number of connections
//   maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity

//   // Retry settings
//   retryWrites: true,

//   // Other important options
//   heartbeatFrequencyMS: 10000, // Send heartbeat every 10 seconds
// };

// const connectDb = async () => {
//   try {
//     // Validate URI exists
//     if (!process.env.URI) {
//       throw new Error("MongoDB URI not found in environment variables");
//     }

//     console.log("Attempting to connect to MongoDB...");

//     const conn = await mongoose.connect(process.env.URI, mongoOptions);

//     console.log(`✅ MongoDB Connected Successfully`);

//     // Connection event handlers
//     mongoose.connection.on("error", (err) => {
//       console.error("❌ MongoDB connection error:", err.message);
//     });

//     mongoose.connection.on("disconnected", () => {
//       console.log("⚠️  MongoDB disconnected. Attempting to reconnect...");
//     });

//     mongoose.connection.on("reconnected", () => {
//       console.log("✅ MongoDB reconnected successfully");
//     });

//     mongoose.connection.on("close", () => {
//       console.log("🔒 MongoDB connection closed");
//     });
//   } catch (error) {
//     console.error("❌ Failed to connect to MongoDB:", error.message);

//     // Log specific error details
//     if (error.name === "MongoNetworkError") {
//       console.error(
//         "🌐 Network Error - Check your internet connection and MongoDB Atlas configuration"
//       );
//     } else if (error.name === "MongooseServerSelectionError") {
//       console.error(
//         "🖥️  Server Selection Error - Check if MongoDB cluster is running and accessible"
//       );
//     }

//     // Don't crash the app, retry after delay
//     console.log("🔄 Retrying connection in 5 seconds...");
//     setTimeout(connectDb, 5000);
//   }
// };

// // Graceful shutdown handling
// const gracefulShutdown = async () => {
//   try {
//     await mongoose.connection.close();
//     console.log("🔒 MongoDB connection closed through app termination");
//     process.exit(0);
//   } catch (error) {
//     console.error("Error during graceful shutdown:", error);
//     process.exit(1);
//   }
// };

// // Handle process termination
// process.on("SIGINT", gracefulShutdown);
// process.on("SIGTERM", gracefulShutdown);

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err) => {
//   console.error("Unhandled Promise Rejection:", err);
//   gracefulShutdown();
// });

// module.exports = connectDb;

const mongoose = require("mongoose");
require("dotenv").config();

// Connection options for better stability and error handling
const mongoOptions = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  retryWrites: true,
  heartbeatFrequencyMS: 10000,
};

// ✅ CRITICAL: Global cache for Mongoose connection in serverless environments.
// This prevents multiple connection pools from being created if this module is required multiple times.
let isConnected = false;
let connectionPromise = null;

const connectDb = async () => {
  // If we already have a connection, just return immediately.
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection from cache");
    return mongoose.connection; // Return the existing connection
  }

  // If a connection attempt is already in progress, wait for that promise.
  if (connectionPromise) {
    console.log("🔄 Connection attempt already in progress, waiting...");
    await connectionPromise;
    return mongoose.connection;
  }

  // Validate URI exists
  if (!process.env.URI) {
    throw new Error("MongoDB URI not found in environment variables");
  }

  console.log("🌱 Attempting to connect to MongoDB...");

  // Create a new promise for the connection attempt and cache it.
  connectionPromise = mongoose.connect(process.env.URI, mongoOptions)
    .then((mongooseInstance) => {
      isConnected = true;
      console.log(`✅ MongoDB Connected Successfully`);
      return mongooseInstance;
    })
    .catch((error) => {
      // If the connection fails, reset the promise so we can retry later.
      console.error("❌ Initial connection attempt failed:", error.message);
      connectionPromise = null; // Clear the promise on failure
      throw error; // Re-throw the error to be caught by the outer catch
    });

  // Now await the promise we just created and return the connection.
  try {
    await connectionPromise;
    return mongoose.connection;
  } finally {
    // Note: We do not set `connectionPromise = null` here on success.
    // It remains cached so future calls know a connection already exists.
  }
};

// ✅ ATTACH EVENT LISTENERS ONLY ONCE
// This is the key. These were being added every time connectDb() was called.

// Error event - log it
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err.message);
  // On error, we mark the connection as broken so the next call will try to reconnect.
  isConnected = false;
  connectionPromise = null;
});

// Disconnected event - log it and reset our cache
mongoose.connection.on("disconnected", () => {
  console.log("⚠️  MongoDB disconnected. Next call will attempt to reconnect.");
  isConnected = false;
  connectionPromise = null;
});

// Reconnected event - update our cache
mongoose.connection.on("reconnected", () => {
  console.log("✅ MongoDB reconnected successfully");
  isConnected = true;
});

// Close event - reset cache
mongoose.connection.on("close", () => {
  console.log("🔒 MongoDB connection closed");
  isConnected = false;
  connectionPromise = null;
});

// Graceful shutdown handling
const gracefulShutdown = async () => {
  try {
    // Only try to close if we are connected to avoid errors on shutdown
    if (mongoose.connection.readyState !== 0) { // 0 = disconnected
      await mongoose.connection.close();
      console.log("🔒 MongoDB connection closed through app termination");
    }
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
  // Note: We don't call gracefulShutdown here as it might be a minor error.
  // Just log it heavily.
});

module.exports = connectDb;