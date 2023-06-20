const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://user:user@caregivers.rgfjqts.mongodb.net/?retryWrites=true&w=majority';
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
mongoose.set('strictQuery', false);
const router = require('express').Router();

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const app = express()
const port = process.env.port || 5005;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


    app.get('/getData', async (req,res) => {
      const field = req.query.field
      const field2 = req.query.field2
      //console.log(req.query)
      try {
        await client.connect();
        const database = client.db("careGivers");
        const collection = database.collection('dataset')

        if(req.query.field === 'HR'){
        const minValue = 50;
        const maxValue = 140;
        const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        const document = await collection.findOne({[field]: {$gt: randomValue}});
        console.log(document)
        }
        else{
          if(req.query.field === 'SpO2'){
            const minValue = 85;
            const maxValue = 99;
            const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
            console.log(randomValue)
            const document = await collection.findOne({[field]: {$gt: randomValue}});
            console.log(document)
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
            console.log(document)
          }
        }

      } catch (error) {
        console.log(error)
        return res.status(500)
      }
    })



    app.listen(port,(err) => {
      if(err)
          console.log(err);
      console.log('server running on port ' + port);
  })