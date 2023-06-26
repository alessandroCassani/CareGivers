const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://user:user@caregivers.rgfjqts.mongodb.net/?retryWrites=true&w=majority';
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
mongoose.set('strictQuery', false);
const { patient_caregivers } = require('./src/models/patient_associated_caregivers.js');
const { otp } = require('./src/models/otp.js');
const { caregivers_patient } = require('./src/models/caregivers_associated_patients.js');
const router = require('express').Router();


const app = express()
const port = process.env.port || 5001;
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
       mongoose.connect('mongodb+srv://user:user@caregivers.rgfjqts.mongodb.net/associazioni?retryWrites=true&w=majority')
      console.log('DB connected')
    } catch (error) {
      console.log(error)
    }
  }

  app.post('/insertOtp', async (req,res) =>{
    console.log('DENTRO INSERT OTP SERVER')
    database();
  
    try{
      console.log(req.body.otp)
      console.log(req.body.email)
      
      const Otp = new otp({
        email: req.body.email,
        otp: req.body.otp
      })

      const response = await Otp.save()
      console.log(response)

      res.status(200).json({message: 'otp generato correttamente'})
      }catch(error){
        console.log(error)
        res.status(404).json("User not found");
    }
  })


  app.post('/checkOtp', async (req,res) => {
    console.log('DENTRO CHECK OTP SERVER')
    database();

    try {
      console.log(req.body.otp)
      console.log(req.body.email_paziente)
      console.log(req.body.email_caregiver)

      const match = await otp.findOne({email:req.body.email_paziente, otp: req.body.otp})
      console.log(match)
      if(match!=null){
        const associazione_paziente= new patient_caregivers({
          email: req.body.email_paziente,
          caregivers:{caregiver1: req.body.email_caregiver}
        })
        await associazione_paziente.save()

        const associazione_caregiver = new caregivers_patient({
          caregiver: req.body.email_caregiver,
          patient: req.body.email_paziente
        })
        await associazione_caregiver.save()

        return res.status(200).json({
          message: 'otp confermato'
        })}
      else
        return res.status(400).json({
          message: 'errore'
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