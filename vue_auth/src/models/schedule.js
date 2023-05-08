const mongoose = require('mongoose');

const memoSchema = new mongoose.Schema({
  paziente: String,
  evento: String,
  data: Date,
  orario: String,
  expirationTime: { type: Number, required: true },
  expireAt: { type: Date, default: Date.now, index: { expires: 0 } }
});

memoSchema.pre('save', function() {
  // Calculate the expiration time based on the user-selected value
  const expirationTimeInSeconds = this.expirationTime;
  
  // Set the `expires` option for the TTL index
  memoSchema.index({ expireAt: 1 }, { expireAfterSeconds: expirationTimeInSeconds });
});

const Memo = mongoose.model('schedule', memoSchema);
module.exports = { Memo };