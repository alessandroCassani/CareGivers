const mongoose = require('mongoose');

const memoSchema = new mongoose.Schema({
  paziente: String,
  evento: String,
  data: Date,
  orario: String,
});


const Memo = mongoose.model('schedule', memoSchema);
module.exports = { Memo };