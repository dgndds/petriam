const mongoose = require('mongoose');

const model = mongoose.Schema({
    ownerId: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    hostId: {
        type: mongoose.ObjectId,
        ref: 'Host',
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    arrangementDate: {
        type: Date,
        default: Date.now
    },
    pets: {
        type: Array,
        ref: 'Pet',
        default: []
    },
    price: {
        type: String,
        default: '0'
    },
    // Sent, Accepted, Rejected, Cancelled, Abandoned
    status: {
        type: String,
        default: 'Sent'
    },
});

module.exports = new mongoose.model("Contract", model);