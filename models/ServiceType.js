const mongoose = require('mongoose');

const ServiceTypeSchema = new mongoose.Schema({
    cost: Number,
    serviceName: String,
})

const ServiceType = mongoose.model('serviceType', ServiceTypeSchema);

module.exports = ServiceType;