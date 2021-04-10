const mongoose = require("mongoose");

module.exports.connectionDB = async () => {
  try {
    // create database

    // to rename your database use : mongodb://localhost:27017/Dihan
    // otherwise mongodb://localhost:27017
    await mongoose.connect("mongodb://localhost:27017/Dihan", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Database connection successfully done!");
  } catch (error) {
    console.log("Some kind of error is happend!");
  }
};
