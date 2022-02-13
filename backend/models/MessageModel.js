const mongoose = require('mongoose');

const model = mongoose.Schema({
    content: {
        type: String,
        default: ''
    },
    messageDate: {
        type: Date,
        default: Date.now
    },
    senderId: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
});

module.exports = new mongoose.model("Message", model);