const jwt = require("jsonwebtoken");

// custome middleware
module.exports.auth = (req, res, next) => {
  if (req.signedCookies) {
    const cookieAuth = req.signedCookies["auth"];
  }
  next();
};
