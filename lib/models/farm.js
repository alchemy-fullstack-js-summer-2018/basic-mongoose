const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: {
            type: String,
            required: true
        },
        zip: String
    },
    practices: String,
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'large']
    },
    organic: {
        type: Boolean,
        default: false
    },
    products: [String]
});

module.exports = mongoose.model('Farm', schema);