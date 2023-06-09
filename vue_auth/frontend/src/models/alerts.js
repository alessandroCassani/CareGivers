const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userSchema = new schema({
    patient: { type: String, unique: true},
    fc: String,
    spO2: String,
    systolic: String,
    diastolic: String
});

const alerts = mongoose.model('alerts',userSchema);
module.exports = { alerts };