const noRoute = (req, res, next) => {
  const error = new Error("No route matched");
  res.status(404);
  next(error);
};
module.exports = noRoute;
