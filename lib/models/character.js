const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    class: [String],
    race: String,
    description: String,
    hp: { 
        type: Number,
        min: 4
    },
    attributes: {
        STR: Number,
        INT: Number,
        WIS: Number,
        DEX: Number,
        CON: Number,
        CHA: Number
    }

});
module.exports = mongoose.model('Character', schema);