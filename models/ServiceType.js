const mongoose = require('mongoose');

const ServiceTypeSchema = new mongoose.Schema({
    cost: {
        type: Number,
        required: true
    },
    serviceName: {
        type: String,
        required: true
    },
    timeDuration: String,
})

const ServiceType = mongoose.model('serviceType', ServiceTypeSchema);

module.exports = ServiceType;
