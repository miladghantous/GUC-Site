const mongoose = require('mongoose');

const ConferenceSchema = new mongoose.Schema({

    title:{
      type: String,
      required: true,
      unique: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: true,
    },

},{ timestamps: true });

const Conference = mongoose.model('Conference', ConferenceSchema);
module.exports = Conference;
