const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Purchase route
router.post("/", async (req, res) => {
  let name = req.body.name;
  let price = req.body.price;
  let amount = req.body.amount;

  let user = await User.findById(req.body.id);
  if (!user.portfolio) {
    res.status(400).json({ msg: "No stocks in portfolio." });
  } else {
    let flag = true;
    user.portfolio.forEach((stock) => {
      if (stock.name == name) {
        if (stock.amount >= amount) {
          stock.price -= amount * price; // Update purchase price
          stock.amount -= amount; // Update stock amount
          user.balance += amount * price; // Update user balance
          flag = false;
        } else {
          res
            .status(400)
            .json({ msg: `Insufficient ${{ name }} stocks to sell.` });
        }
      }
    });

    user.save(); // Save collection

    // Send success response
    res.status(200).json({
      msg: `${name} succesfully sold.`,
    });
  }
});

module.exports = router;
