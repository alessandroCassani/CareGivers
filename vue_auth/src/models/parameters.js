const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userSchema = new schema({
    fc: String,
    spO2: String,
    systolic: String,
    diastolic: String,
    movements: String
});

const parameters = mongoose.model('parameters',userSchema);
module.exports = { parameters };