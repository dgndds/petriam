const mongoose = require('mongoose');

// Status type: 0 = pending, 1 = approved, 2 = rejected
const model = mongoose.Schema({
    userId: {
        type: mongoose.ObjectId
    },
    tc: {
        type: String,
        required: true
    },
    acceptedPets: {
        type: Array,
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
    status: {
        type: String,
        default: '0'   // Admins will change the status to 1 or 2 depending on the application
    }
});

module.exports = new mongoose.model("HostApplication", model);