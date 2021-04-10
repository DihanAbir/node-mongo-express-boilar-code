const { validationResult } = require("express-validator");

// model
const Note = require("../models/notes");

// get all datas section
module.exports.getNotesController = async (req, res) => {
  console.log(req.user);
  const note = await Note.find();
  res.send(note);
};

// get single datas section
module.exports.getNoteController = async (req, res) => {
  const errorss = validationResult(req);

  if (!errorss.isEmpty()) {
    return res.status(404).send("Note is not abailable");
  }
  try {
    const Id = req.params.id;
    const note = await Note.findById(Id);
    if (!note) return res.status(404).send("No Note Founde");

    res.status(400).send(note);
  } catch (error) {
    res.status(500).send("Note Server Error");
  }
};

// add section
module.exports.addNotesController = async (req, res) => {
  const note = new Note(req.body);

  try {
    await note.save();
    res.send(note);
  } catch (error) {
    res.status(500).send("server error is accured!");
  }
};

// update section
module.exports.putNoteController = async (req, res) => {
  const id = req.params.id;

  const gotNoteInput = Object.keys(req.body);
  const allowUpdates = ["title", "description"];
  const isAllowed = gotNoteInput.every((update) =>
    allowUpdates.includes(update)
  );

  if (!isAllowed) return res.status(400).send("Invalid Updates!");
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).send(error.array());
  }
  try {
    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!note) return res.status(404).send("Notes Not Found");
    res.send(note);
  } catch (error) {
    res.status(500).send("Server is Error");
  }
};

// delete section
module.exports.deleteNoteController = async (req, res) => {
  const id = req.params.id;

  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(404).send(error.array());

  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) return res.status(404).send("Note is not Found");
    res.send(note);
  } catch (error) {
    res.status(500).send("Server error ");
  }
};
