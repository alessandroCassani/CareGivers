const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://user:user@caregivers.rgfjqts.mongodb.net/?retryWrites=true&w=majority';
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const { Memo } = require('./src/models/schedule.js')
const bcrypt = require('bcrypt');
mongoose.set('strictQuery', false);
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
        console.log(req.body.name)
        console.log(req.body.reminderDate)
        console.log(req.body.reminderTime)
        console.log('email ' + req.body.email_paziente)

        const dataMemo = new Date(req.body.reminderDate)
        
        const [hoursString, minutesString] = req.body.reminderTime.split(":");
        const selectedTime = {
          hours: parseInt(hoursString, 10),
          minutes: parseInt(minutesString, 10),
        };
        const selectedDate = new Date(dataMemo.getFullYear(), dataMemo.getMonth(), dataMemo.getDate(), selectedTime.hours, selectedTime.minutes);

        const timeDiffInSeconds = Math.floor((selectedDate.getTime() - new Date()) / 1000);
        console.log(timeDiffInSeconds + ' DIFFERENZA SECONDI')

        const schedule = new Memo({
          paziente: 'cassa@gmail.com',                      //MODIFICARE
          evento: req.body.name,
          data: req.body.reminderDate,
          orario: req.body.reminderTime,
          createdAt: new Date(),
          expires: timeDiffInSeconds
        })

        await schedule.save();
        return res.status(200).json({
          message: 'inserimento memo confermato'
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
          message: 'errore'
        })
    }

  })



  app.get('/getMemos', async (req,res) => {
    console.log('DENTRO GET-MEMO SERVER')
    database();

    try {
      const documents = await Memo.find({email: req.body.email});
      console.log(documents)
      res.json(documents)
      

    } catch (error) {
      console.log(err);
          res.status(500).json({ message: 'Internal server error' });
          return;
    }

  })





  app.listen(port,(err) => {
    if(err)
        console.log(err);
 
    console.log('server running on port ' + port);
})