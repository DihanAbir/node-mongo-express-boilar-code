const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "Must Enter a valid Email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Please enter atleast 8 character!"],
    validate: {
      validator(value) {
        return !value.toLowerCase().includes("password");
      },
      message: "Password must not containe 'password'",
    },
  },
});

// generate token for persistance
userSchema.methods.generateAuthToken = function () {
  // here we set what field will store on jwt for researve data
  const token = jwt.sign({ id: this._id, email: this.email }, "secretKey", {
    expiresIn: "4h",
  });
  return token;
};

// mongoose hooks
userSchema.pre("save", async function (next) {
  const hasedPassword = await bcrypt.hash(this.password, 10);
  if (this.isModified("password")) {
    this.password = hasedPassword;
  }
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
