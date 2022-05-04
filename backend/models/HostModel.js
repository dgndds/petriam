const mongoose = require('mongoose');

// Pet type 0=dog, 1=cat, 2=bird, 3=turtle, 4=other
const model = mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        red: 'User',
        required: true
    },
    tc: {
        type: String,
        required: true
    },
    acceptedPets: {
        type: Array,
        default: []
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
        default: ''
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
    active: {
        type: Boolean,
        default: true   // If enabled host will be listed in search results
    },
});

module.exports = new mongoose.model("Host", model);