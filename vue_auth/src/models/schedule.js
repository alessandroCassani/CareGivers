const mongoose = require('mongoose');

const memoSchema = new mongoose.Schema({
  evento: String,
  data: Date,
  expirationTime: { type: Number, required: true },
  expireAt: { type: Date, default: Date.now, index: { expires: 0 } }
});

memoSchema.pre('save', function() {
  // Calculate the expiration time based on the user-selected value
  const expirationTimeInSeconds = this.expirationTime * 60;
  
  // Set the `expires` option for the TTL index
  this.index({ expireAt: 1 }, { expireAfterSeconds: expirationTimeInSeconds });
});

const Memo = mongoose.model('schedule', memoSchema);
module.exports = { Memo };