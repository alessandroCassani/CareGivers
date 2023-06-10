import mqtt from 'mqtt';

const mqttBrokerUrl = 'mqtt://localhost:1234';
const mqttConnection = mqtt.connect(mqttBrokerUrl);

mqttConnection.on('error', (error) => {
  console.error('MQTT connection error:', error);
});

mqttConnection.on('close', () => {
  console.log('MQTT connection closed');
});

export default mqttConnection;