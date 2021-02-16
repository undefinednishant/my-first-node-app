const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// player schema - model
const playerSchema = new Schema({
    name: String,
    age:  { type: String, default: 0 },
    location: { type: String, default: "India"},
    salary: {type: Number, default: 2000},
    active: {type: Boolean, default: false}, 
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('player', playerSchema);