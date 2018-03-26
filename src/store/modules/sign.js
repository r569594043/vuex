import localForage from 'localforage';
import Api from '@/api';
import * as types from '../mutation-types';

/* eslint-disable no-shadow */

// initial state
const state = {
  signed: false,
  showModal: false
};

// getters
const getters = {
  'signed': state => state.signed,
  'showModal': state => state.showModal
};

// actions
const actions = {
  async signIn({ commit }, { user, password }) {
    let ret = await Api.sign.signIn(user, password);
    // let signed = ret.signed;
    let signed = true;
    await localForage.setItem('signed', signed);
    commit(types.SIGN_IN, { signed });
  },
  async restoreSign({ commit }) {
    let signed = await localForage.getItem('signed');
    if(signed) {
      commit(types.RESTORE_SIGN, { signed });
    }
    return signed;
  },
  async signOut({ commit }) {
    let ret = await Api.sign.signOut();
    await localForage.removeItem('signed');
    commit(types.SIGN_OUT);
  }
};

// mutations
const mutations = {
  [types.SIGN_IN](state, { signed }) {
    state.signed = true;
  },
  [types.RESTORE_SIGN](state, { signed }) {
    state.signed = signed;
  },
  [types.SIGN_OUT](state) {
    state.signed = false;
  },
  [types.SHOW_SIGN_IN_MODAL](state) {
    state.showModal = true;
  },
  [types.HIDE_SIGN_IN_MODAL](state) {
    state.showModal = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
