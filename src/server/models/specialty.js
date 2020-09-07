const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const specialtySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    groups: {
        type: [String],
        required: true
    }
});

const SpecialtyModel = mongoose.model('Specialty', specialtySchema);

module.exports = SpecialtyModel;
