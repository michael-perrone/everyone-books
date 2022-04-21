const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema({
    shiftDate: String,
    timeStart: String,
    timeEnd: String,
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    employeeName: String,
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business'
    },
    isBreak: Boolean,
    breakStart: String,
    breakEnd: String,
    bookingColumnNumber: String,
})

const Shift = mongoose.model('shift', ShiftSchema);

module.exports = Shift;