const multer = require("multer");

const storage = multer.memoryStorage(); // Store file in memory (RAM)
const upload = multer({ storage });

module.exports = upload;
