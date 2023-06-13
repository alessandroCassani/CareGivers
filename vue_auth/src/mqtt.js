import mqtt from 'mqtt';

const mqttModule = {
  state: {
    clients: {},
    subscriptions: {},
  },
  mutations: {
    setClient(state, { clientId, client }) {
      state.clients[clientId] = client;
    },
    removeClient(state, clientId) {
      delete state.clients[clientId];
      delete state.subscriptions[clientId];
    },
    setSubscriptions(state, { clientId, subscriptions }) {
      state.subscriptions[clientId] = subscriptions;
    },
  },
  actions: {
    connect({ commit }, { brokerUrl, clientId }) {
      // Create a client instance
      const client = mqtt.connect(brokerUrl, { clientId, clean: false });

      // Connect to the MQTT broker
      client.on('connect', () => {
        console.log(`Connected to MQTT broker with clientId: ${clientId}`);
        commit('setClient', { clientId, client });
      });

      // Handle MQTT connection errors
      client.on('error', (error) => {
        console.error(`MQTT error for clientId ${clientId}:`, error);
      });
    },
    disconnect({ state, commit }, clientId) {
      if (state.clients[clientId]) {
        state.clients[clientId].end(() => {
          console.log(`Disconnected from MQTT broker for clientId: ${clientId}`);
          commit('removeClient', clientId);
        });
      }
    },
    subscribe({ state, commit }, { clientId, topic }) {
      if (state.clients[clientId]) {
        state.clients[clientId].subscribe(topic);
        const subscriptions = state.subscriptions[clientId] || [];
        subscriptions.push(topic);
        commit('setSubscriptions', { clientId, subscriptions });
      }
    }
  },
};

export default mqttModule;
    