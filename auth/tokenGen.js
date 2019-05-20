const jwt = require("jsonwebtoken");

module.exports = function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    instructor: user.instructor
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, process.env.SECRET, options);
};
