const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
    servicesEffected: {
        type: [ServiceType]
    }
});

const Promotion = mongoose.model("product", promotionSchema);

module.exports = Promotion;
