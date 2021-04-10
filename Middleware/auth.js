const jwt = require("jsonwebtoken");

// custome middleware
module.exports.auth = (req, res, next) => {
  req.body.random = "Hello";
  next();
};
