const mongoose = require('mongoose');

const memoSchema = new mongoose.Schema({
  evento: String,
  data: String,
  orario: String,
  expiresAt: Date,
});

const Memo = mongoose.model('Memo', memoSchema);