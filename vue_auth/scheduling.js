const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://user:user@caregivers.rgfjqts.mongodb.net/?retryWrites=true&w=majority';
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const { Memo } = require('./src/models/schedule.js')
const { terapia } = require('./src/models/therapy.js')
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
        //console.log('email ' + req.body.email_paziente)

        const dataMemo = new Date(req.body.data)
        
        const [hoursString, minutesString] = req.body.orario.split(":");
        const selectedTime = {
          hours: parseInt(hoursString, 10),
          minutes: parseInt(minutesString, 10),
        };
        const selectedDate = new Date(dataMemo.getFullYear(), dataMemo.getMonth(), dataMemo.getDate(), selectedTime.hours, selectedTime.minutes);

        const timeDiffInSeconds = Math.floor((selectedDate.getTime() - new Date()) / 1000);
        console.log(timeDiffInSeconds + ' DIFFERENZA SECONDI')

        const schedule = new Memo({
          paziente: req.body.email_paziente,                      
          evento: req.body.evento,
          data: req.body.data,
          orario: req.body.orario,
          createdAt: new Date(),
          expires: timeDiffInSeconds
        })

        await schedule.save();
        return res.status(200).json({
          message: 'inserimento promemoria avvenuto con successo'
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
          message: 'errore'
        })
    }

  })


  app.get('/getMemos', async (req,res) => {
    //console.log('DENTRO GET-MEMO SERVER')
    database();

    try {
      const documents = await Memo.find({email: req.body.email});
      //console.log(documents)
      res.json(documents)
    } catch (error) {
      console.log(err);
          res.status(500).json({ message: 'Internal server error' });
          return;
    }
  })


  app.post('/insertTherapy', async(req,res) => {

    console.log('DENTRO INSERT TERAPIA SERVER')
    database();

    try {
      const farmaci = new terapia({
        farmaco: req.body.farmaco,
        orario: req.body.orario,
        dosaggio: req.body.dosaggio,
        paziente: req.body.email_paziente
      })

      await farmaci.save()

      return res.status(200).json({
        message: 'farmaco inserito correttamente'
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'errore'})
    }
  })


  app.get('/getTherapy', async (req,res) => {
    console.log('DENTRO GET-Therapy SERVER')
    database();

    try { 
      const documents = await terapia.find({email: req.body.email});
      //console.log(documents)
      res.json(documents)
    } catch (error) {
      console.log(err);
          res.status(500).json({ message: 'Internal server error' });
          return;
    }
  })


  app.post('/deleteTask', async (req,res) => {
   // console.log('DENTRO CANCELLA TASK SERVER')
    database();
    console.log(req.body.email)

    try {
      const result = await Memo.deleteOne({paziente: req.body.email, evento: req.body.evento})
      console.log(result)
      return res.status(200).json({message: 'evento cancellato correttamente'})
    } catch (error) {
      console.log(err);
          res.status(500).json({ message: 'Internal server error' });
          return;
    }
  })


  app.post('/deleteDrug', async (req,res) => {
   // console.log('DENTRO CANCELLA farmaco SERVER')
    database();
    console.log(req.body.email)

    try {
      const result = await terapia.deleteOne({paziente: req.body.email, farmaco: req.body.farmaco})
      console.log(result)
      return res.status(200).json({message: 'farmaco cancellato correttamente'})
    } catch (error) {
      console.log(err);
          res.status(500).json({ message: 'Internal server error' });
          return;
    }
  })


  app.post('/editTask', async (req,res) => {
    console.log('DENTRO modifica task SERVER')
    database();
    console.log(req.body.email)

    try {
      const result = await Memo.updateOne({paziente: req.body.email, evento: req.body.evento})
      console.log(result)
      return res.status(200).json({message: 'memo modificato correttamente'})
    } catch (error) {
      console.log(err);
          res.status(500).json({ message: 'Internal server error' });
          return;
    }
  })


  app.post('/getEmailPatient', async(req,res)=>{
    console.log('dentro get email paziente server')
    console.log(req.body.email)
    try {
      await client.connect();
        const database = client.db("associazioni");
        const collection = database.collection('caregivers_patients')
  
        const result = await collection.findOne({caregiver: req.body.email})
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
      console.log(error)
    }
  })


  app.listen(port,(err) => {
    if(err)
        console.log(err);
 
    console.log('server running on port ' + port);
})