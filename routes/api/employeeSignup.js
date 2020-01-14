const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Admin = require("../../models/Admin");
const User = require("../../models/User");

const Employee = require("../../models/Employee");

router.post('/', async (req, res) => {
    try {
          let user = await User.findOne({ email: req.body.email });
          let admin = await Admin.findOne({ email: req.body.email });
          let employee = await Employee.findOne({ email: req.body.email });
          if (employee || admin || user) {
            return res
              .status(400)
              .json({ errors: [{ msg: "That email is already being used" }] });
          }

          let realFirstNameArray = req.body.firstName.split("");
          realFirstNameArray[0] = realFirstNameArray[0].toUpperCase();
          let realFirstName = realFirstNameArray.join("");

          let realLastNameArray = req.body.lastName.split("");
          realLastNameArray[0] = realLastNameArray[0].toUpperCase();
          let realLastName = realLastNameArray.join("");

          let newEmployee = new Employee({
            firstName: realFirstName,
            lastName: realLastName,
            fullName: realFirstName + " " + realLastName,
            email: req.body.email,
            tennisClub: req.body.tennisClub,
            profession: req.body.profession
          });
          const salt = await bcrypt.genSalt(10);
          newEmployee.password = await bcrypt.hash(
            req.body.createPassword,
            salt
          );

          await newEmployee.save();

          const payload = {
            employee: {
              fullName: newEmployee.fullName,
              id: newEmployee.id,
              employeeName: `${newEmployee.firstName} ${newEmployee.lastName}`
            }
          };

          jwt.sign(
            payload,
            config.get("instructorSecret"),
            { expiresIn: 360000 },
            (error, token) => {
              if (error) {
                throw error;
              } else {
                res.status(200).json({ token });
              }
            }
          );
        } catch (error) {
          console.log(error);
          res.status(500).send("Server Error");
        }
      }
);

module.exports = router;
