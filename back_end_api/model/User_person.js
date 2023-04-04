const mongoose = require('mongoose');

const Gender = {
    Male: 'male',
    Female: 'female'
};

const UserDataSchema = new mongoose.Schema({
    Band_ID: {
        type: Number,
        required: [true, 'Please provide a Band ID'],
    },
    User_ID: {
        type: Number,
        required: [true, 'Please provide a User ID'],
    },
    Status: {
        type: Boolean,
        required: [true, 'Please provide a Status'],
    },
    DOB: {
        type: Date,
        required: [true, 'Please provide a DOB'],
    },
    Age: {
        type: Number,
    }, 
    Gender: {
        type: String,
        enum: Object.values(Gender),
        required: true
    }
})

// ------------ SCHEMA METHODS ----------------
// calculate age
UserDataSchema.methods.calculateAge = function() {
    const today = new Date();
    const birthDate = new Date(this.DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    this.Age = age;
    return age;
}


// ------------ SCHEMA ----------------

const User_person = mongoose.model('User_person', UserDataSchema);

module.exports = User_person;