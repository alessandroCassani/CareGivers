const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://user:user@caregivers.rgfjqts.mongodb.net/?retryWrites=true&w=majority';
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const { user } = require('./src/models/user.js')
const bcrypt = require('bcrypt');
const { patient_caregivers } = require('./src/models/patient_associated_caregivers.js')
const router = require('express').Router();


const app = express()
const port = process.env.port || 5001;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const database = async() => {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    try {
      await mongoose.connect('mongodb+srv://user:user@caregivers.rgfjqts.mongodb.net/associazioni?retryWrites=true&w=majority')
      console.log('DB connected')
    } catch (error) {
      console.log(error)
    }
  }




  app.get('/info', async (req,res) =>{
    database();

    try{
        console.log(req.email)
    const response  = await user.find({email: req.body.email})
    res.status(200).json(user)
    console.log(response)
    }catch(error){
        res.status(404).json("Users not found");
    }
  })



app.listen(port,(err) => {
    if(err)
        console.log(err);
 
    console.log('server running on port ' + port);
})