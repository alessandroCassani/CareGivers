const mqtt = require('mqtt');

const brokerUrl = 'mqtt://localhost:1234';

const client = mqtt.connect(brokerUrl);

module.exports = client;