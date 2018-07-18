const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        city: String,
        state: {
            type: String,
            required: true
        },
    },
    stadium: {
        type: String,
        enum: ['square', 'oval', 'round']
    },
    roster: {
        type: Number,
        required: true,
        min: 12,
        max: 15
    },
    featuring: [String]
});




module.exports = mongoose.model('Team', schema);