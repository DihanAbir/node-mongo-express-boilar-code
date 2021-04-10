const { response } = require("express");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const User = require("../models/user");

// get any user
module.exports.getuserController = async (req, res) => {
  try {
    const user = await User.find({}, "-password");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }

  res.send("Get all the users ");
};

// get single user
module.exports.userController = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).send("User Not Fount!");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }

  res.send("Get all the users ");
};

// get any user
module.exports.getuserController = async (req, res) => {
  try {
    const user = await User.find({}, "-password");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }

  res.send("Get all the users ");
};

// add new user
module.exports.adduserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }
  const user = new User(req.body);
  try {
    //  same email is exits or not is checked here
    // for more checking, have to use ternary operation for more readability

    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) return res.status(400).send("Email is exist already!");

    // hashing

    await user.save();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};
// loginController
module.exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(500).send("Unable to login");
    //check user password

    const isMatched = bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(404).send("unable to login");

    // note:
    //     first make a method on main schema (as we make a method on login main schema on model)
    //     then return token and retrive from controller
    //     that's it

    // generate auth
    const token = user.generateAuthToken();

    // if we send on header, al the time ir req to server , its not efficient so that we save token on cookies
    // --***---
    // res.header("x-auth-token", token);

    res.cookie("auth", token, {
      httpOnly: true,
      sameSite: true,
      signed: true,
      maxAge: 4 * 60 * 60 * 1000,
    });

    console.log(token);

    //successfully user login
    res.send("success");
  } catch (error) {
    res.status(500).send(error);
  }
  //check user email
};
