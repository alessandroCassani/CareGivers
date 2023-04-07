const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const { user } = require('./models/user.js')
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://acassani:<Admin123>@caregivers.rgfjqts.mongodb.net/?retryWrites=true&w=majority');
const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//routes
app.post('/signup',(req, res, next)=> {
    console.log(req.body.nome);
    const newUser = new user({
        email:req.body.email,
        nome: req.body.nome,
        cognome: req.body.cognome,
        codiceFiscale: req.body.codiceFiscale,
        password: bcrypt.hashSync(req.body.password,10),                               
        ruolo: req.body.ruolo
    })

    newUser.save(err=> {
        if(err){
            return res.status(400).json({
                title:'error',
                error: 'email gia in uso'
            })       
        }
        return res.status(200).json({
            title: 'registrazione avvenuta con successo'
        })


    console.log(newUser);
})})



app.listen(port,(err) => {
    if(err)
        console.log(err);
    console.log('server running on port ' + port);
})
