const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://user:user@caregivers.rgfjqts.mongodb.net/?retryWrites=true&w=majority';
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const { user } = require('./models/user.js')
const bcrypt = require('bcrypt');


const app = express();
const port = process.env.port || 5000;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const database = async() => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  try {
    await mongoose.connect('mongodb+srv://user:user@caregivers.rgfjqts.mongodb.net/Users?retryWrites=true&w=majority')
    console.log('DB connected')
  } catch (error) {
    console.log(error)
  }
}

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//routes
app.post('/signup', async (req, res, next)=> {
    const newUser = new user({
        email:req.body.email,
        nome: req.body.nome,
        cognome: req.body.cognome,
        codiceFiscale: req.body.codiceFiscale,
        password: bcrypt.hashSync(req.body.password,10),                               
        ruolo: req.body.ruolo
    })

    database()
    
    try {
      await newUser.save();
      console.log('ciao');
    } catch (error) {
      console.log(error);
    }
})



app.listen(port,(err) => {
    if(err)
        console.log(err);
    console.log('server running on port ' + port);
})
