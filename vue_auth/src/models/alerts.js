const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userSchema = new schema({
    patient: String,
    fc: number,
    spO2: number,
    systolic: number,
    diastolic: number
});

const alerts = mongoose.model('alerts',userSchema);
module.exports = { alerts };