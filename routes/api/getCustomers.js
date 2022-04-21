const express = require("express");
const router = express.Router();
const TennisClub = require("../../models/TennisClub");
const User = require("../../models/User");
const Booking = require("../../models/Booking");
const Admin = require("../../models/Admin");
const adminAuth = require('../../middleware/authAdmin');

router.post("/", async (req, res) => {
  const tennisClub = await TennisClub.findOne({
    clubNameAllLower: req.body.clubNameAllLower
  });
  let users = await User.find({ _id: tennisClub.followers });
  const namesMatching = [];
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].fullName
        .toLowerCase()
        .includes(req.body.customerName.toLowerCase())
    ) {
      namesMatching.push({ name: users[i].fullName, id: users[i]._id });
    }
  }
  if (namesMatching.length > 0) {
    res.status(200).json({ customers: namesMatching });
  } else {
    res.status(400).json({ error: "No one found" });
  }
});

router.post("/saveNewPlayers", async (req, res) => {
  const booking = await Booking.findOne({ _id: req.body.bookingId });
  let oldPlayers = booking.players;
  booking.players = req.body.newPlayers;
  await booking.save();
  let newPlayers = booking.players;

  let samePlayers = [];
  let deletedPlayers = [];
  let playersAdded = [];
  for (let x = 0; x < oldPlayers.length; x++) {
    if (newPlayers.includes(oldPlayers[x])) {
      samePlayers.push(oldPlayers[x]);
    } else {
      deletedPlayers.push(oldPlayers[x]);
    }
  }
  for (let w = 0; w < newPlayers.length; w++) {
    if (oldPlayers.includes(newPlayers[w])) {
      samePlayers.push(newPlayers[w]);
    } else {
      playersAdded.push(newPlayers[w]);
    }
  }

  const players = await User.find({ _id: deletedPlayers });
  for (let i = 0; i < players.length; i++) {
    let newBookings = players[i].bookings.filter(eachBooking => {
      return eachBooking != booking.id;
    });
    players[i].bookings = newBookings;
    await players[i].save();
  }
  const newPlayersToAdd = await User.find({ _id: playersAdded });
  for (let t = 0; t < newPlayersToAdd.length; t++) {
    let playersBookings = [...newPlayersToAdd[t].bookings, booking.id];
    newPlayersToAdd[t].bookings = playersBookings;
    await newPlayersToAdd[t].save();
  }

  res.status(200).json({ booking });
});

router.post("/addNewCustomer", adminAuth, async (req, res) => {
  const date = new Date(req.body.date).toDateString();
    let phoneArray = req.body.phoneNumber.split("");
  for (let i = 0; i < phoneArray.length; i++) {
    if (phoneArray[i] !== "0" && phoneArray[i] !== "1" && phoneArray[i] !== "2" && phoneArray[i] !== "3" && phoneArray[i] !== "4" && phoneArray[i] !== "5" && phoneArray[i] !== "6" && phoneArray[i] !== "7" && phoneArray[i] !== "8" && phoneArray[i] !== "9") {
      phoneArray[i] = "";
    }
  }
  let realPhoneArray = phoneArray.filter(e => e !== "");
  console.log(phoneArray.length)
  if (realPhoneArray.length === 0) {
    return res.status(406).send();
  }
  let realPhone = realPhoneArray.join("");
  const user = await User.findOne({ phoneNumber: realPhone }).select(["fullName"]);
  if (user) {
    console.log(user)
    let bookingsAlready = await Booking.find({ customer: user._id, date: date });
    console.log(bookingsAlready);
    console.log("USER USER USER")
    res.status(200).json({ user });
  } else {
    res.status(400).send();
  }
})

module.exports = router;