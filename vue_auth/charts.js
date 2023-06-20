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
      console.log(req.query)
      try {
        await client.connect();
        const database = client.db("careGivers");
        const collection = database.collection('dataset')

        const minValue = 50;
        const maxValue = 57;

        const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        console.log(randomValue)

        const document = await collection.findOne({[field]: {$gt: randomValue}});
        console.log(document)

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