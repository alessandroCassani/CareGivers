const { S } = require('@bachdgvn/vue-otp-input');
const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userSchema = new schema({
    patient: String,
    fc: String,
    spO2: String,
    systolic: String,
    diastolic: String
});

const alerts = mongoose.model('alerts',userSchema);
module.exports = { alerts };