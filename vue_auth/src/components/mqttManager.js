// mqttManager.js
import mqtt from 'mqtt';

const brokerUrl = 'mqtt://localhost:1234';

const connections = {};

export function createMqttConnection(connectionId) {
  if (!connections[connectionId]) {
    const options = {
      // MQTT connection options if required
      clientId: connectionId, // Use a unique identifier for each connection
    };
    connections[connectionId] = mqtt.connect(brokerUrl, options);
  }

  return connections[connectionId];
}

export function closeMqttConnection(connectionId) {
  if (connections[connectionId]) {
    connections[connectionId].end();
    delete connections[connectionId];
  }
}
