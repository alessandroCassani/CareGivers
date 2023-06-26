const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://user:user@caregivers.rgfjqts.mongodb.net/?retryWrites=true&w=majority';
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
mongoose.set('strictQuery', false);
const router = require('express').Router();
const {alerts} = require('./src/models/alerts.js')
const {parameters} = require('./src/models/parameters.js')

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const app = express()
const port = process.env.port || 5005;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const database = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  try {
     mongoose.connect('mongodb+srv://user:user@caregivers.rgfjqts.mongodb.net/alerts?retryWrites=true&w=majority')
    console.log('DB connected')
  } catch (error) {
    console.log(error)
  }
}

    app.get('/getData', async (req,res) => {
      const field = req.query.field
      const field2 = req.query.field2
      try {
        await client.connect();
        const database = client.db("careGivers");
        const collection = database.collection('dataset')

        if(req.query.field === 'HR'){
        const minValue = 50;
        const maxValue = 140;
        const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        const document = await collection.findOne({[field]: {$gt: randomValue}});
        res.json(document)
        }
        else{
          if(req.query.field === 'SpO2'){
            const minValue = 85;
            const maxValue = 99;
            const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
            console.log(randomValue)
            const document = await collection.findOne({[field]: {$gt: randomValue}});
            res.json(document)
          }else{
            const minValueSystolic = 90
            const maxValueSystolic = 145
            const minValueDyastolic = 40
            const maxValueDyastolic = 95
            const randomValueSystolic = Math.floor(Math.random() * (maxValueSystolic - minValueSystolic + 1)) + minValueSystolic;
            const randomValueDyastolic = Math.floor(Math.random() * (maxValueDyastolic - minValueDyastolic + 1)) + minValueDyastolic;
            const document = await collection.findOne({$and:[
              {[field]: {$gt: randomValueSystolic}},
              {[field2] : {$gt: randomValueDyastolic}}
            ]});
            res.json(document)
          }
        }
      } catch (error) {
        console.log(error)
        return res.status(500)
      }
    })

    app.post('/getAlerts', async(req,res) => {
      console.log(req.body)
      try {
        await client.connect();
        const database = client.db("alerts");
        const collection = database.collection('alerts')

        const result = await collection.findOne({patient: req.body.email})
        console.log(result)
        res.status(200).json(result)
        
      } catch (error) {
        console.log(error)
      }
    })

    app.post('/insertAlerts', async(req,res) => {
      console.log(req.body)
      try{
        database()
        const alert = new alerts({
         patient: req.body.email,
          fc : req.body.fc,
          spO2: req.body.spO2,
          systolic: req.body.systolic,
          diastolic: req.body.diastolic
      })
      const response = await alert.save()
      console.log(response)

      res.status(200).json({message: 'alert inseriti correttamente'})
    }catch(error){
      console.log(error)
      res.status(500).json({message: 'alert già inserito'})
    }
  })


  axios.post('/insertPv', async (req,res) => {
    console.log(req.body)
    try {
      database()
      const parameter = new parameters({
         fc : req.body.fc,
         spO2: req.body.spO2,
         systolic: req.body.systolic,
         diastolic: req.body.diastolic,
         timestamp: re
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