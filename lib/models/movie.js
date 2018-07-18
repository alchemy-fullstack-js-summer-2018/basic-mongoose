const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    director: String,
    composer: String,
    year: Number,
    voices: {
        chihiro: String,
        haku: String,
        yubaba: String
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    isPixar: {
        type: Boolean,
        default: false
    },
    keywords: [String]
});

module.exports = mongoose.model('Movie', schema);