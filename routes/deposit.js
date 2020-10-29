var express = require("express");
var router = express.Router();
const User = require("../models/user");

// Get all route
router.put("/", async (req, res) => {
  let userID = req.body.id;
  let amount = req.body.amount;

  try {
    let deposit = await User.findByIdAndUpdate(
      userID,
      {
        $inc: { balance: amount },
      },
      { new: true }
    );
    res.status(200).json(deposit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
