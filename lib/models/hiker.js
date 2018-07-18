const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    trailName: {
        type: String,
        required: true
    },
    longTrail: {
        type: String,
        enum: ['PCT', 'CDT', 'AT', 'PCT, AT', 'PCT, CDT', 'AT, CDT', 'PCT, CDT, AT']
    },
    milesHiked: {
        type: Number,
        min: 2184,
        max: 7900,
    },
    tripleCrown: {
        type: Boolean,
        default: false
    }
    
});

module.exports = mongoose.model('Hiker', schema);