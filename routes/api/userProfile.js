const express = require("express");
const router = express.Router();
const authUser = require("../../middleware/authUser");
const User = require("../../models/User");

router.get("/myprofile", authUser, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).select(['businessesFollowing','_id', 'fullName', 'bookings']);
    if (user) {
      res.status(200).json({ user });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/", authUser, async (req, res) => {
  try {
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User Removed" });
  } catch (error) {
    console.log(error);
    res.send(error.msg);
  }
});

module.exports = router;
