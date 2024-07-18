const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({

    email:{
      type: String,
      required: true,
      unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }

},{ timestamps: true });

const Instructor = mongoose.model('Instructor', InstructorSchema);
module.exports = Instructor;
