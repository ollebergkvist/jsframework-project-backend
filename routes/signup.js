// Essentials
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/user"); // MongoDB schema

/**
 * @method - POST
 * @param - /signup
 * @description - User signup
 */

router.post(
  "/",
  [
    check("firstname", "Please enter your firstname").not().isEmpty(),
    check("lastname", "Please enter your lastname").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password, firstname, lastname } = req.body;

    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.status(400).json({
          msg: "User already exists",
        });
      }

      user = new User({
        email,
        password,
        firstname,
        lastname,
      });

      user.password = await bcrypt.hash(password, saltRounds);

      // Create new user
      await user.save();
      res.status(201).json({ msg: "User successfully created" });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ message: err.message });
    }
  }
);

module.exports = router;
