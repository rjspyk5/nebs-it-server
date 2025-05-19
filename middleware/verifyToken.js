const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.Authorization;
  if (!authHeader || authHeader.startsWith("Bearer "))
    res.status(401).send({ success: false, message: "Unauthorized" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user(decoded);
    next();
  } catch (error) {
    req.status(402).send({ message: "Invalid Token", success: false });
  }
};

module.exports = verifyToken;
