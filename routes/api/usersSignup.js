const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const Admin = require("../../models/Admin.js");
const Instructor = require("../../models/Instructor.js");

router.post("/", async (req, res) => {

  let user = await User.findOne({ email: req.body.email.toLowerCase() });
  let admin = await Admin.findOne({ email: req.body.email.toLowerCase() });
  let instructor = await Instructor.findOne({ email: req.body.email.toLowerCase() });
  try {
    if (user || admin || instructor) {
      return res
        .status(400)
        .json({ errors: [{ msg: "That email is already being used" }] });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
  try {

    if (!user) {
      let fullName;
      if (req.body.firstName && req.body.lastName) {
        fullName = req.body.firstName + " " + req.body.lastName
      }
      else {
        fullName = req.body.fullName
      }
      let newUser = new User({
        fullName: fullName,
        email: req.body.email.toLowerCase(),
        phoneNumber: req.body.phoneNumber,
        password: req.body.createPassword,
      });

      const salt = await bcrypt.genSalt(10);

      newUser.password = await bcrypt.hash(req.body.createPassword, salt);

      await newUser.save();

      const payload = {
        user: {
          user: true,
          id: newUser.id,
          userName: newUser.fullName
        }
      };

      jwt.sign(
        payload,
        config.get("userSecret"),
        { expiresIn: 360000000000 },
        (error, token) => {
          if (error) {
            throw error;
          } else {
            res.status(200).json({ token });
          }
        }
      );
    }
  }
  catch (error) {
    console.log(error)
  }
});

module.exports = router;
