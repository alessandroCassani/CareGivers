const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//routes
app.post('/Sign_up',(req, res, next)=> {
    console.log(req.body)
})


app.listen(port,(err) => {
    if(err)
        console.log(err);
    console.log('server running on port ' + port);
})
