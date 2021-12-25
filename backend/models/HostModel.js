const mongoose = require('mongoose');

const model = mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    tc: {
        type: String,
        required: true
    },
    averageRating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Array,
        ref: 'Review',
        default: []
    },
    criminalRecord: {
        type: String,
        default: false
    },
    address: {
        type: String,
        default: ''
    },
    tags: {
        type: Array,
        default: []
    },
    price: {
        type: Number,
        default: 0
    },
    languages: {
        type: Array,
        default: []
    },
});

module.exports = new mongoose.model("Host", model);