const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    Name: {
        type: String,
        required: true
    },

    Origin: {
        type: String,
        required: true
    },

    Console: [String, String],

    Revenue: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Game', schema);