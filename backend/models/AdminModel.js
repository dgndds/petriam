const mongoose = require('mongoose');

const model = mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.ObjectId,
        required: true
    }
});

module.exports = new mongoose.model("Admin", model);