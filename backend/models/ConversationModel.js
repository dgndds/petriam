const mongoose = require('mongoose');

const model = mongoose.Schema({
    users: { 
        type: Array, 
        ref: 'User',
        required: true 
    },
    messages: { 
        type: Array, 
        ref: 'Message',
        default: [] 
    },
});

module.exports = new mongoose.model("Conversation", model);