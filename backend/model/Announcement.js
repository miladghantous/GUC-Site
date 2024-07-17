const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({

    title: {
      type: String,
      required: true,
    },
    details: {
        type: String,
        required: true,
    },
    
},{ timestamps: true });

const Announcement = mongoose.model('Announcement', AnnouncementSchema);
module.exports = Announcement;
