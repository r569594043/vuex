import * as types from '../mutation-types';

/* eslint-disable no-shadow */

// initial state
const state = {
  activeMenu: '',
};

// getters
const getters = {
  activeMenu: (state) => state.activeMenu,
};

// actions
const actions = {
};

// mutations
const mutations = {
  [types.ACTIVE_MENU_CHANGE](state, { menu }) {
    state.activeMenu = menu;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
