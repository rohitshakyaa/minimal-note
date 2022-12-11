import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    synced: false,
  },
  getters: {
    synced: (state) => state.synced,
  },
  mutations: {
    setSync(state: any, payload: string) {
      state.synced = payload;
      console.log(state.synced);
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
