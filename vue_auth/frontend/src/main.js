import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import { createStore } from 'vuex';
import CanvasJSChart from '@canvasjs/vue-charts';

let initialState = {
  selectedItem: null,
};

if (localStorage.getItem('vuex-state')) {
  initialState.selectedItem = JSON.parse(sessionStorage.getItem('vuex-state'));
}

const store = createStore({
  state: {
    ...initialState
  },
  mutations: {
    setSelectedItem(state, item) {
      state.selectedItem = item;
      sessionStorage.setItem('vuex-state', JSON.stringify(state));
    },
  },
  actions: {
    updateSelectedItem({ commit }, item) {
      //console.log('dentro')
      commit('setSelectedItem', item);
    },
  },
});

const app = createApp(App);
app.use(CanvasJSChart);
app.use(router);
app.use(store);

app.mount('#app');