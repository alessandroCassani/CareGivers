const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://user:user@caregivers.rgfjqts.mongodb.net/?retryWrites=true&w=majority';
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const { user } = require('./models/user.js')
const bcrypt = require('bcrypt');
const { patient_caregivers } = require('./models/patient_associated_caregivers.js')


const app = express();
const port = process.env.port || 5000;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const databaseUser = async() => {
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

const database_Patient_Caregivers = async() => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  try {
    await mongoose.connect('mongodb+srv://user:user@caregivers.rgfjqts.mongodb.net/patient_caregivers?retryWrites=true&w=majority')
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
        nome: req.body.nome,
        cognome: req.body.cognome,
        dataDiNascita: req.body.dataDiNascita,
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password,10),                               
        ruolo: req.body.ruolo
    })
  
    databaseUser()
    
    try {
      await newUser.save();
    } catch (error) {
      console.log(error);
    }

    if(req.body.ruolo=="paziente"){
      database_Patient_Caregivers()
      const patient = new patient_caregivers({
        email: req.body.email
    })
      try {
        await patient.save();
      } catch (error) {
        console.log(error);
      }

    }


})


app.post('/login', async (req,res,next) =>{
  database();
  console.log(req.email);
  console.log('dentro al login')
  user.findOne({
    email:req.body.email
  }).then((account) => {
    
    console.log('query eseguita');
      if(!account){
        console.log(res);
        console.log('utente non trovato')
        res.json({success:false, error: "utente non trovato"})
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        account.password
      );

      if (!passwordIsValid) {
        console.log('password errata')
        res.json({success:false, error: "password errata"})
      }

      console.log('trovato')
      res.status(200).send({
        id: user._id,
        nome: user.nome,
        cognome: user.cognome,
        codiceFiscale: user.codiceFiscale,
        ruolo: user.ruolo,
        dataDiNascita: user.dataDiNascita
      });
  }).catch((err) => {
    console.log(err);
    return res.status(500).send({message : err});
  });
});




app.listen(port,(err) => {
    if(err)
        console.log(err);
    console.log('server running on port ' + port);
})
