const mongoose = require('mongoose');

const EvaluationFormSchema = new mongoose.Schema({

    instructorName: {
        type: String,
        required: true,
    },
    title: {
      type: String,
      required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        enum: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
        required: true,
    }

},{ timestamps: true });

const EvaluationForm = mongoose.model('EvaluationForm', EvaluationFormSchema);
module.exports = EvaluationForm;
