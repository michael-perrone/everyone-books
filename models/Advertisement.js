const mongoose = require("mongoose");


const AdvertisementSchema = mongoose.Schema({
    adHeader: String,
    adDetails: String,
    target: String,
})


const Advertisement = mongoose.model("advertisement", AdvertisementSchema);

module.exports = Advertisement;