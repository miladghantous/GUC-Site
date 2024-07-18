const mongoose = require('mongoose');

const FundSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    }

},{ timestamps: true });

const Fund = mongoose.model('Fund', FundSchema);
module.exports = Fund;
