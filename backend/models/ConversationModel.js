const mongoose = require('mongoose');

const model = mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hostUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: {
        type: Array,
        ref: 'Message',
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = new mongoose.model("Conversation", model);