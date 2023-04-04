const mongoose = require('mongoose');

// ------------ IMPORT ----------------

const UserBandSchema = new mongoose.Schema({
    Band_ID: {
        type: Number,
        required: [true, 'Please provide a Band ID'],
    },
    User_ID: {
        type: Number,
        required: [true, 'Please provide a User ID'],
    },
    Zone_ID: {
        type: Number,
    },
    Date:{
        type: Date,
        // date time now
        default: Date.now,
        unique: true,
        index: true
    },
    HeartRate: {
        type: Number
    },
    Battery: {
        type: Number
    },
});

// ------------ SCHEMA ----------------

// ------------ SCHEMA METHODS ----------------

const User_Band = mongoose.model('User_Band', UserBandSchema);

module.exports = User_Band;