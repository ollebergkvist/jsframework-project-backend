var express = require("express");
var router = express.Router();
const User = require("../models/user");

// Get all route
router.post("/", async (req, res) => {
  const userID = req.body.id;

  try {
    const user = await User.findById(userID);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
