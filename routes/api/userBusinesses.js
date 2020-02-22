const express = require("express");
const router = express.Router();
const userAuth = require("../../middleware/authUser");
const User = require("../../models/User");
const Business = require("../../models/Business");

router.get("/", userAuth, async (req, res) => {
  const businesses = await Business.find({ followers: req.user.id });
  if (businesses.length) {
    return res.status(200).json({ businesses });
  } else if (!businesses.length) {
    return res.status(204).send();
  }

  /*  if (user && tennisClubs) {

    return res.status(200).json({ tennisClubs });
  } */
});

module.exports = router;
