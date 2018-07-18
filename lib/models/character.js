const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        enum: ['Fighter', 'Cleric', 'Magic User', 'Thief']
    },
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