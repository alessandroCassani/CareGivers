import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import { createStore } from 'vuex';

const store = createStore({
  state: {
    selectedItem: '',
  },
  mutations: {
    setSelectedItem(state, item) {
      state.selectedItem = item;
    },
  },
  actions: {
    updateSelectedItem({ commit }, item) {
      console.log('dentro')
      commit('setSelectedItem', item);
    },
  },
});

const app = createApp(App);
app.use(router);
app.use(store);

app.mount('#app');