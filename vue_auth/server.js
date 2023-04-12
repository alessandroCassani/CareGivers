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
        nome: req.body.nome,
        cognome: req.body.cognome,
        dataDiNascita: req.body.dataDiNascita,
        recapiti: {email:req.body.email},
        password: bcrypt.hashSync(req.body.password,10),                               
        ruolo: req.body.ruolo
    })

    database()
    
    try {
      await newUser.save();
    } catch (error) {
      console.log(error);
    }
})


app.get('/login', async (req,res,next) =>{
  database();
  console.log('dentro al login')
  user.findOne({
    recapiti:{email:req.body.email}
  }).then((res) => {
    console.log('query eseguita');
      if(!res){
        console.log(res);
        console.log('utente non trovato')
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        res.password
      );

      if (!passwordIsValid) {
        console.log('password errata')
        return res.status(401).send({ message: "Invalid Password!" });
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
