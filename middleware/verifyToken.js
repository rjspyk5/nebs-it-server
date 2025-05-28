const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
console.log(authHeader)
  if (!authHeader) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }
  // if (!authHeader || authHeader.startsWith("Bearer ") || !req.cookies)
  //   return res.status(401).send({ success: false, message: "Unauthorized" });
  const token = authHeader.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(402).send({ message: "Invalid Token", success: false });
  }
};

module.exports = verifyToken;
