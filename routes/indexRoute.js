const express = require("express");
const router = express.Router();

// get single items
router.get("/", async (req, res) => {
  res.send("Welcome to the root URL");
});

// not found page
router.get("*", async (req, res) => {
  res.status(404).send("404 page error!!");
});

module.exports = router;
