const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://user:user@caregivers.rgfjqts.mongodb.net/?retryWrites=true&w=majority';
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const { user } = require('./src/models/user.js')
const bcrypt = require('bcrypt');
const { patient_caregivers } = require('./src/models/patient_associated_caregivers.js')
mongoose.set('strictQuery', false);
const jwt = require('jsonwebtoken')


const app = express()
const port = process.env.port || 5000;

const database =  () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  try {
     mongoose.connect('mongodb+srv://user:user@caregivers.rgfjqts.mongodb.net/Users?retryWrites=true&w=majority')
    console.log('DB connected')
  } catch (error) {
    console.log(error)
  }
}

app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



//routes
app.post('/signup', express.json(), async (req, res) => {
  console.log('dentro signup server')
    const newUser = new user({
        nome: req.body.nome,
        cognome: req.body.cognome,
        dataDiNascita: req.body.dataDiNascita,
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password,10),                               
        ruolo: req.body.ruolo
    })
    database()
    try{
    const utente = await newUser.save()
    console.log(utente)
    
    return res.status(200).json({
        message: "User created"
    });
    }catch(err){
      console.log("error => " + err)
      res.status(409).json({
      message: "ERROR"
      })
    }
}) ;



app.post('/login', (req,res) =>{
  database();
  var jwt = require('jsonwebtoken')
  console.log('dentro login server')
  console.log(req.body)
   
   user.findOne({email:req.body.email}, (err,User) => {
    if(err) return res.status(500).json({
     title: 'server error', 
      error: err
    })


  if(!User){
    return res.status(400).json({
      title: 'user not found',
     error: 'invalid credentials'
   })
  }

  if(!bcrypt.compareSync(req.body.password,User.password)) {
    return res.status(401).json({
      title: 'login failed',
      error: 'invalid credentials'
    })
  }
  
  //console.log('trovato')
  let token = jwt.sign({userID: User._id},'secretKey');
  return res.status(200).json({
    message: 'login avvenuto correttamente',
    token: token,
    email: User.email,
    ruolo: User.ruolo
  })
});
});


app.listen(port,(err) => {
    if(err)
        console.log(err);
    console.log('server running on port ' + port);
})