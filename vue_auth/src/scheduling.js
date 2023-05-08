const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://user:user@caregivers.rgfjqts.mongodb.net/?retryWrites=true&w=majority';
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const { schedule } = require('./src/models/schedule.js')
const bcrypt = require('bcrypt');
mongoose.set('strictQuery', false);
const { patient_caregivers } = require('./src/models/patient_associated_caregivers.js');
const { otp } = require('./src/models/otp.js');
const { caregivers_patient } = require('./src/models/caregivers_associated_patients.js');
const router = require('express').Router();


const app = express()
const port = process.env.port || 5002;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const database = () => {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    try {
       mongoose.connect('mongodb+srv://user:user@caregivers.rgfjqts.mongodb.net/scheduling?retryWrites=true&w=majority')
      console.log('DB connected')
    } catch (error) {
      console.log(error)
    }
  }


  app.post('/insertMemo', async (req,res) => {
    console.log('DENTRO INSERT-MEMO SERVER')
    database();

    try {
        console.log(req.body.evento)
        console.log(req.body.data)
        console.log(req.body.ora)

        

        const scheduling = new schedule({
            evento: req.body.evento,
            data: req.body.data,

        })

        
    } catch (error) {
        console.log(error)
    }

  })





  app.listen(port,(err) => {
    if(err)
        console.log(err);
 
    console.log('server running on port ' + port);
})