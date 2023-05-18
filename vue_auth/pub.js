var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')

var topic = 'test'
var message = 'hello world'

client.on('connect', ()=>{
    setInterval(()=>{
        client.publish(topic,message)
        console.log('message sent', message)
    },5000)
})