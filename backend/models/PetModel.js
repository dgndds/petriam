const mongoose = require('mongoose');

// Pet type 0=dog, 1=cat, 2=bird, 3=turtle, 4=other
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