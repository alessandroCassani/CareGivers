
const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userSchema = new schema({
    nome: String,
    email: {
        unique : true,
        type: String
    },
    password: String,
    cognome: String,
    dataDiNascita: Date,
    codiceFiscale: String,
    ruolo: String
});

const user = mongoose.model('users',userSchema);
module.exports = { user };