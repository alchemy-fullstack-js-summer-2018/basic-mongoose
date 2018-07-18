const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },

    Origin: {
        country: {
            type: String,
            required: true
        }
    },

    Console: [String, String],

    revenue: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Game', schema);