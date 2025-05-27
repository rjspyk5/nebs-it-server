const verifyAdminstation = {
  verifyAdmin: async(req, res, next) => {
 
    if (parseInt(!req?.user?.role )=== 1)
      return res.status(403).send({ message: "Unauthorized", success: false });
    next();
  },
};

module.exports = verifyAdminstation;
