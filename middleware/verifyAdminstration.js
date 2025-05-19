const verifyAdminstation = {
  verifyAdmin: (req, res, next) => {
    if (req?.user?.role === "user")
      return res.status(403).send({ message: "Unauthorized", success: false });
    next();
  },
};

module.exports = verifyAdminstation;
