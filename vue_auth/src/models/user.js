
const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userSchema = new schema({
    nome: String,
    cognome: String,
    dataDiNascita: Date,
    codiceFiscale: String,
    password: String,
    confermaPassword: String,
    ruolo: String,
    email: String,
    recapiti: {
        telefono1: String,
        telefono2: String
    },
    patologie: [{
        patologia: String
    }],
});

const user = mongoose.model('users',userSchema);
module.exports = { user };