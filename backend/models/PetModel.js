const mongoose = require('mongoose');

const model = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    type: {
        type: Number,
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = new mongoose.model("Pet", model);