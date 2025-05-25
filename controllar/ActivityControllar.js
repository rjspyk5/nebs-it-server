


const Activity = require("../model/ActivityModel");
const Jobs = require("../model/jobsModel");
const Projects = require("../model/projectsModel");
const Blogs = require("../model/blogsModel");
const User = require("../model/userModel");

function watchModel(model, collectionName, titleField = "title") {
  const changeStream = model.watch();

  changeStream.on("change", async (change) => {
    try {
      const { operationType, documentKey } = change;
      let doc = null;

      // Fetch the full document to extract the title or name
      if (operationType !== "delete") {
        doc = await model.findById(documentKey._id).lean();
      } else if (change?.fullDocument) {
        doc = change.fullDocument;
      }

      const activity = new Activity({
        collectionName,
        documentId: documentKey._id,
        title: doc?.[titleField] || "Untitled",
        operationType,
        actionTime: new Date(),
      });

      await activity.save();
      console.log(`[${collectionName}] ${operationType} - ${activity.title}`);
    } catch (err) {
      console.error("Activity log error:", err.message);
    }
  });
}

function ActivityControllar() {
  watchModel(User, "users", "name"); 
  watchModel(Blogs, "blogs", "title");
  watchModel(Projects, "projects", "title");
  watchModel(Jobs, "jobs", "title");
}

module.exports = ActivityControllar;
