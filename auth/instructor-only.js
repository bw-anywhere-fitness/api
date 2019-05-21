module.exports = function(req, res, next) {
  if (req.decodedJwt.instructor) {
    next();
  } else {
    res.status(403).json({ message: "restricted, must be instructor" });
  }
};
