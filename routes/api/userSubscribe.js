const express = require("express");
const router = express.Router();
const Business = require("../../models/Business");
const User = require("../../models/User");

router.post("/", async (req, res) => {
  try {
    let subscriberExists = await Business.find({
      followers: req.body.userId
    });
    let doesExist = false;
    for (let i = 0; i < subscriberExists.length; i++) {
      if (
        subscriberExists.length > 0 &&
        subscriberExists[i]._id == req.body.businessId
      ) {
        doesExist = true;
      }
    }
    if (doesExist) {
      return res
        .status(406)
        .json({ error: "You have already subscribed to this club" });
    }
    let business = await Business.findOne({ _id: req.body.businessId });
    if (business) {
      business.followers.unshift(req.body.userId);
      await business.save();
    }
    let user = await User.findOne({ _id: req.body.userId });
    if (user) {
      user.businessesFollowing.unshift(req.body.businessId);
      await user.save();
    }

    if (user && business) {
      res.status(200).send()
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/unfollow", async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.body.userId });
    console.log(user)
    let newBusinessesFollowing = user.businessesFollowing.filter(
      businessId => businessId != req.body.businessId
    );
    let business = await Business.findOne({ _id: req.body.businessId });
    let newBusinessFollowers = business.followers.filter(
      userId => userId != req.body.userId
    );
    if (user && business) {
      user.businessesFollowing = newBusinessesFollowing;
      await user.save();
      business.followers = newBusinessFollowers;
      await business.save();
      let businessAfterFilter = await Business.find({
        followers: user._id
      });
      return res.status(200).send()
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
