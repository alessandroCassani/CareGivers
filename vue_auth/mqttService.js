const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
MQTT_Port = 1884
const ws = require('websocket-stream')

server.listen(MQTT_Port, function () {
  console.log('Aedes MQTT server started and listening on port ', MQTT_Port)
})

const wssPort = 1234
const host = '0.0.0.0' // localhost

var wsSslServer = require('http').createServer({})
ws.createServer({ server: wsSslServer}, aedes.handle)
wsSslServer.listen(wssPort, host, function () {
    console.log('WSS server listening on port', wssPort)
})


aedes.on('client', function (client) {
  console.log(`CLIENT_CONNECTED : MQTT Client ${(client ? client.id : client)} connected to aedes broker ${aedes.id}`)
})

