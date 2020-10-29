const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Purchase route
router.post("/", async (req, res) => {
  let name = req.body.name;
  let price = req.body.price;
  let amount = req.body.amount;

  let user = await User.findById(req.body.id);
  if (!user.balance || user.balance < req.body.price) {
    res.status(400).json({ msg: "Not enough funds available" });
  } else {
    let flag = true;
    user.portfolio.forEach((stock) => {
      // Logic if stock already exists in user portfolio
      if (stock.name == name) {
        stock.price += req.body.amount * req.body.price; // Update purchase price
        stock.amount += req.body.amount; // Update stock amount
        flag = false;
      }
    });

    // Logic if stock don't exist in user portfolio
    if (flag) {
      user.portfolio.push({
        name: name,
        amount: amount,
        price: price,
      });
    }

    user.balance -= req.body.amount * req.body.price; // Update user balance
    user.save(); // Save collection

    // Send success response
    res.status(200).json({
      msg: `Purchase of ${name} completed.`,
    });
  }
});

module.exports = router;
