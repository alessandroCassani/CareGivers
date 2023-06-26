const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userSchema = new schema({
    fc: String,
    spO2: String,
    systolic: String,
    diastolic: String,
    movements: String,
    timestamp: {
        type: Date,
        default: moment().defaultFormat('DD/MM/YYYY')
      },
});

userSchema.index({ timestamp: 1 });

const parameters = mongoose.model('parameters',userSchema);
module.exports = { parameters };