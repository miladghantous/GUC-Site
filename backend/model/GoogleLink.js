const mongoose = require('mongoose');

const GoogleLinkSchema = new mongoose.Schema({

    subject: {
      type: String,
      required: true,
    },
    dateAdded: {
        type: Date,
        required: true,
    },
    
},{ timestamps: true });

const GoogleLink = mongoose.model('GoogleLink', GoogleLinkSchema);
module.exports = GoogleLink;
