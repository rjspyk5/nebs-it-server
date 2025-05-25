const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  collectionName: String,
  documentId: mongoose.Schema.Types.ObjectId,
  title: String,
  operationType: String,
  actionTime: { type: Date, default: Date.now },
});
const Activity=mongoose.model("Activity", activitySchema);
module.exports = Activity;
