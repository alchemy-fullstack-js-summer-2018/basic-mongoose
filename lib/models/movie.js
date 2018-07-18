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
    languages: {
        1: {
            type: String,
            required: true
        },
        2: {
            type: String,
            required: true
        }
    },
    keywords: [String]
});

module.exports = mongoose.model('Movie', schema);