const jwt = require("jsonwebtoken");
const genarateToken = (payload) => {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

module.exports = genarateToken;
