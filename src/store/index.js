import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import * as actions from './actions';
import * as getters from './getters';
import todo from './modules/todo';
import sign from './modules/sign';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    todo,
    sign
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
