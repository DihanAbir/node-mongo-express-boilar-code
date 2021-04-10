const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

// controllers
const {
  adduserController,
  userController,
  loginController,
  getuserController,
} = require("../controllers/userController");

// route operations

// get
router.get("/", getuserController);

// single user
router.get("/:id", userController);

// POST
router.post(
  "/",
  // user inputes validatoin using validator js
  [
    check("firstName", "First Name is required!").notEmpty(),
    check("lastName", "last Name is required!").notEmpty(),
    check("email", "email Name is required!").notEmpty(),
    check("email", "email must be valid!").isEmail(),
    check("password", "password Name is required!").notEmpty(),
    check("password", "password Name is required!").notEmpty(),
    // confirm pass is for just check, it's not send to database
    // just for more user express
    check("confirmPassword", "confirmPassword Name is required!").notEmpty(),
    check("confirmPassword").custom((value, { req }) => {
      // {req} containe the value which is come from the api req value.
      // custome validation
      if (value !== req.body.password) {
        throw new Error("Confirm password is not match");
      } else {
        return true;
      }
    }),
  ],
  adduserController
);

// login user
router.post("/login", loginController);

module.exports = router;
