const jwt = require("jsonwebtoken");

// models
const User = require("../models/user");

// custome middleware
module.exports.auth = async (req, res, next) => {
  if (req.signedCookies) {
    // accessing token from cookies
    const token = req.signedCookies["auth"];
    // console.log(token);
    try {
      // verify token from cookies with session
      const decode = jwt.verify(token, "secretKey");
      // console.log(decode);

      // getting user with authorizeation
      const user = await User.findById(decode.id);
      req.user = user;
      next();
    } catch (error) {
      res.status(500).send("unauthorize user / Try to modify token !");
    }
  } else {
    res.status(500).send("unauthorized  access!");
    // next()
  }
};
