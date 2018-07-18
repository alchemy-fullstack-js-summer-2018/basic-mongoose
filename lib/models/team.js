const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    region: {
        type: String,
        enum: ['North America', 'South America', 'Europe', 'CIS', 'China', 'Southeast Asia']
    },
    members: {
        type: [{
            type: String,
            minlength: 2,
            maxlength: 20
        }],
        validate: [arrayLimit, 'there must be 5 {PATH}']
    },
    coach: {
        type: String,
        maxlength: 20
    },
    invited: { 
        type: Boolean,
        default: false
    }
});

function arrayLimit(val) {
    return val.length === 5;
}

module.exports = mongoose.model('Team', schema);