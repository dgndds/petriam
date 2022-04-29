const mongoose = require('mongoose');

const model = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        default: 0
    },
    comment: {
        type: String,
        default: ''
    }
});

module.exports = new mongoose.model("Review", model);