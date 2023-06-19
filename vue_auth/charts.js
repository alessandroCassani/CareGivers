const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://acassani%40studenti.uninsubria.it:Admin123@caregivers.rgfjqts.mongodb.net/?retryWrites=true&w=majority';
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


  app.get('/getPV', async (req,res) => {
    database();

    try {
        await client.connect();
        const email = sessionStorage.getItem('email')
        const database = client.db("careGivers");
        const collection = database.collection(email + "vitalParameters");
    
        const last10Items = await collection.find({ HR: 1 }).sort({ $natural: -1 }).limit(10).toArray();
        if(last10Items.length==0){
            res.status(404).json({ message: 'non esistono pv precedenti' });
        }
        res.json(last10Items)
      } catch (error) {
        console.error("Error fetching data from the database:", error);
        throw error;
      } finally {
        await client.close();
      }
    })





    app.listen(port,(err) => {
      if(err)
          console.log(err);
   
      console.log('server running on port ' + port);
  })