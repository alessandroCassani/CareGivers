const mqtt = require('mqtt');

class MQTTConnection {
  constructor() {
    if (MQTTConnection.instance) {
      return MQTTConnection.instance;
    }

    const mqttBrokerUrl = 'mqtt://localhost:1234';
    this.client = mqtt.connect(mqttBrokerUrl);

    this.client.on('error', (error) => {
      console.error('MQTT connection error:', error);
    });

    this.client.on('close', () => {
      console.log('MQTT connection closed');
    });

    MQTTConnection.instance = this;
  }

  getClient() {
    return this.client;
  }
}

module.exports = new MQTTConnection().getClient();
