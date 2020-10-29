// Essentials
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const User = require("../models/user"); // MongoDB schema

/**
 * @method - POST
 * @param - /login
 * @description - User login
 */

router.post(
  "/",
  [
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

    const { email, password } = req.body;

    try {
      let user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(400).json({
          msg: "User don't exist in db",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect password",
        });

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            status: 200,
            type: "Success",
            message: "User successfully logged in",
            id: user.id,
            token: token,
          });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

module.exports = router;
