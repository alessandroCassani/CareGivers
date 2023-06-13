import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import { createStore } from 'vuex';
import mqtt from 'mqtt'

const store = createStore({
    state: {
        userClients: {},
        userSubscriptions: {},
      },
      mutations: {
        setUserClient(state, { userId, client }) {
          state.userClients[userId] = client;
        },
        removeUserClient(state, userId) {
          delete state.userClients[userId];
        },
        setUserSubscription(state, { userId, topic, callback }) {
          if (!state.userSubscriptions[userId]) {
            state.userSubscriptions[userId] = {};
          }
          state.userSubscriptions[userId][topic] = callback;
        },
        removeUserSubscription(state, { userId, topic }) {
          if (state.userSubscriptions[userId]) {
            delete state.userSubscriptions[userId][topic];
          }
        },
      },
      actions: {
        connectMqttClient({ commit, state }, { userId, brokerUrl, options }) {
          if (!state.userClients[userId]) {
            const client = mqtt.connect(brokerUrl, options);
    
            // Save the MQTT client to the store
            commit('setUserClient', { userId, client });
          }
        },
        disconnectMqttClient({ commit, state }, userId) {
          const client = state.userClients[userId];
    
          if (client) {
            client.end(() => {
              // Remove the MQTT client from the store
              commit('removeUserClient', userId);
            });
          }
        },
        subscribeTopic({ commit, state }, { userId, topic, callback }) {
          const client = state.userClients[userId];
    
          if (client) {
            client.subscribe(topic);
            client.on('message', callback);
    
            // Save the subscription in the store
            commit('setUserSubscription', { userId, topic, callback });
          }
        },
        unsubscribeTopic({ commit, state }, { userId, topic }) {
          const client = state.userClients[userId];
    
          if (client) {
            client.unsubscribe(topic);
    
            // Remove the subscription from the store
            commit('removeUserSubscription', { userId, topic });
          }
        },
      },
});

const app = createApp(App);
app.use(router);
app.use(store);

app.mount('#app');