
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
    recapiti: {
        email: String,
        telefono1: String,
        telefono2: String
    },
    patologie: [{
        patologia: String
    }],
    terapie:[{
        farmaco: String,
        dosaggio: Number
    }]
});

const user = mongoose.model('users',userSchema);
module.exports = { user };


email: {
    unique : true,
    type: String
},