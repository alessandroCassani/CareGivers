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
          //console.log(userId)
          //console.log(client)
          state.userClients[userId] = client;
          //  console.log(state.userClients)
        },
        removeUserClient(state, userId) {
          delete state.userClients[userId];
        },
        setUserSubscription(state, { userId, topic, callback }) {
          if (!state.userSubscriptions[userId]) {
            //inizializza
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
          async connectMqttClient({ commit, state }, { userId, brokerUrl}) {
          if (!state.userClients[userId]) {
            try {
              //console.log(userId)
              //console.log(brokerUrl )
              const client = mqtt.connect(brokerUrl);
              //console.log(client)
              const object = {
                userId: userId,
                client: client
              }
      
              await new Promise((resolve) => {
                client.on('connect', () => {
                  console.log('Connected to MQTT broker');
                  resolve();
                  commit('setUserClient', object);
                })});
      
              client.on('error', (error) => {
                console.error('MQTT client error:', error);
              });
            } catch (error) {
              console.error('Error connecting to MQTT broker:', error);
            }
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
          console.log(state.userClients[userId])
          const client = state.userClients[userId];
          console.log('User ID:', userId);
          console.log('Client:', client);
          console.log('Topic:', topic);
    
          if (client) {
            client.subscribe(topic);
            client.on('message', callback);
            const object = {
              userId: userId,
              client: topic,
              callback: callback
            }
            // Save the subscription in the store
            commit('setUserSubscription', object);
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
        publishMessage({ state }, { userId, topic, message }) {
            const client = state.userClients[userId];
      
            if (client) {
              client.publish(topic, message);
              console.log("spedito");
            }
          },
      },
});

const app = createApp(App);
app.use(router);
app.use(store);

app.mount('#app');