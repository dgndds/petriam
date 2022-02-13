const mongoose = require('mongoose');

const model = mongoose.Schema({
    hostId: {
        type: mongoose.ObjectId,
        ref: 'Host',
        required: true
    },
    userId: {
        type: mongoose.ObjectId,
        ref: 'User',
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
    contractDate: {
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
    status: {
        type: String,
        default: ''
    },
});

module.exports = new mongoose.model("Contract", model);