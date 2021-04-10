const mongoose = require("mongoose");

// created a schema
const noteSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      unique: false,
    },
    description: {
      type: String,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model("Note", noteSchema);
module.exports = Notes;
