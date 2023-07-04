const crypto = require('crypto');

export function encrypt(plaintext) {
  const cipher = crypto.createCipher('aes-256-cbc', 'mwkldnwlkcndwjncvkj');
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decrypt(ciphertext) {
  const decipher = crypto.createDecipher('aes-256-cbc', 'mwkldnwlkcndwjncvkj');
  let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}