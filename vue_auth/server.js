const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const { user } = require('./models/user.js')
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//routes
app.post('/signup',(req, res, next)=> {
    const newUser = new user({
        email:req.body.email,
        nome: req.body.nome,
        cognome: req.body.cognome,
        codiceFiscale: req.body.codiceFiscale,
        password: bcrypt.hashSync(req.body.password,10),                                //aggiungere HASH
        ruolo: req.body.ruolo
    })

    console.log(newUser);
})


app.listen(port,(err) => {
    if(err)
        console.log(err);
    console.log('server running on port ' + port);
})
