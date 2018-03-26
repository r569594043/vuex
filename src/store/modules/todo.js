// import todoApi from '@/api/todo';
import Api from '@/api';
import * as types from '@/store/mutation-types';

/* eslint-disable no-shadow */

// initial state
const state = {
  all: [],
};

// getters
const getters = {
  all: state => state.all,
  active: state => state.all.filter(todo => !todo.completed),
  completed: state => state.all.filter(todo => todo.completed),
  remaining: (state, getters) => getters.active.length,
};

// actions
const actions = {
  async getAllTodos({ commit }) {
    const todos = await Api.todo.fetch();
    commit(types.FETCH_TODOS, { todos });
  },
  async addTodo({ commit }, newTodo) {
    const todo = await Api.todo.add(newTodo);
    commit(types.ADD_TODO, { todo });
  },
  async removeTodo({ commit }, todo) {
    await Api.todo.remove(todo);
    commit(types.REMOVE_TODO, { todo });
  },
  async removeCompleted({ commit, getters }) {
    const todos = await Api.todo.save(getters.active);
    commit(types.REMOVE_COMPLETED, { todos });
  },
  async updateTodo({ commit }, todo) {
    await Api.todo.modify(todo);
    commit(types.UPDATE_TODO, { todo });
  },
  async changeAllCompletedStatus({ commit, state }, completed) {
    const tmpTodos = state.all.map(todo => ({
      completed,
      id: todo.id,
      title: todo.title,
    }));
    await Api.todo.save(tmpTodos);
    commit(types.CHANGE_ALL_COMPLETED_STATUS, { todos: tmpTodos });
  },
};

// mutations
const mutations = {
  [types.FETCH_TODOS](state, { todos }) {
    state.all = todos;
  },

  [types.REMOVE_COMPLETED](state, { todos }) {
    state.all = todos;
  },

  [types.CHANGE_ALL_COMPLETED_STATUS](state, { todos }) {
    state.all = todos;
  },

  [types.ADD_TODO](state, { todo }) {
    state.all.push(todo);
  },

  [types.REMOVE_TODO](state, { todo }) {
    // const index = state.all.indexOf(todo);
    const index = state.all.findIndex(_ => _.id === todo.id);
    if (index !== -1) {
      state.all.splice(index, 1);
    }
  },

  [types.UPDATE_TODO](state, { todo }) {
    const td = state.all.find(_ => _.id === todo.id);
    if (td) {
      td.title = todo.title;
      td.completed = todo.completed;
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
