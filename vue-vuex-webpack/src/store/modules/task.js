import _ from 'lodash';

import request from '@/store/request';
import * as types from '@/store/mutation-types';

const filterTask = (state) => {
  let tasks = state.tasks

  if (tasks.length == 0) {
    return;
  }

  if (state.element.id) {
    tasks = tasks.filter(function (row) {
      return row.listId == this.element.id
    }, this)
  }

  if (state.searchTask.length > 2) {
    tasks = tasks.filter(function (row) {
      if (row.title.toLowerCase().indexOf(state.searchTask.toLowerCase().trim()) != -1) {
        state.searchList.push(row.listId);
        return row;
      }
    }, this)
  } else {
    state.searchList = [];
  }

  state.task = task;

  return state
};

const filterList = (state) => {
  let lists = state.lists

  if (state.searchList.length) {
    var tmpLists = [];
    lists.forEach(function (list) {
      state.searchList.forEach(function (item) {
        if (list._id == item) {
          tmpLists.push(list)
        }
      }, this)
    }, this)
    lists = tmpLists;
  }

  state.lists = lists

  return state
};

// initial state
const state = {
  lists: [],
  tasks: [],
  searchList: [],
  element: {},
  searchTask: '',
};

// getters
const getters = {
  lists: state => state.lists,
  tasks: state => state.tasks,
  element: state => state.element,
  searchList: state => state.searchList,
  searchTask: state => state.searchTask
};

// actions
const actions = {
  getLists({ commit }) {
    request.getLists().then((lists) => {
      commit(types.RECEIVE_LISTS, { lists });
    });
  },
  getTasks({ commit }) {
    request.getTasks().then((tasks) => {
      console.log('tasks', tasks);
      commit(types.RECEIVE_TASKS, { tasks });
    });
  },
  addTask({ commit }, task) {
    request.addTask(task).then((task) => {
      console.log('add task', task);
      commit(types.RECEIVE_ADD_TASK, { task });
    });
  },
  editTask({ commit }, task) {
    request.editTask(task).then((task) => {
      console.log('edit task', task);
      commit(types.RECEIVE_EDIT_TASK, { task });
    });
  },
  deleteTask({ commit }, task) {
    request.deleteTask(task).then((task) => {
      console.log('delete task', task);
      commit(types.RECEIVE_DELETE_TASK, { id: task.id });
    });
  },
  launchSearch({ commit }, search) {
    commit(types.RECEIVE_SEARCH, {search});
  },
  selectElement({ commit }, element) {
    commit(types.RECEIVE_ELEMENT, {element});
  },
};

// mutations
const mutations = {
  [types.RECEIVE_LISTS](state, { lists }) {
    state.lists = lists;
  },

  [types.RECEIVE_TASKS](state, { tasks }) {
    state.tasks = tasks;
  },

  [types.RECEIVE_SEARCH](state, { search }) {
    state.searchTask = search;
    state = filterTask(state);
    state = filterList(state);
  },

  [types.RECEIVE_ELEMENT](state, { element }) {
    state.element = element;
  },

  [types.RECEIVE_ADD_TASK](state, { task }) {
    console.log('add task', task);
    state.task.push(task);
    state = filterTask(state);
  },

  [types.RECEIVE_EDIT_TASK](state, { task }) {
    console.log('edit task', task);
    state.tasks.map((item) => {
      if (item._id !== id) return item
      return Object.assign({}, item, task)
    })
  },

  [types.RECEIVE_DELETE_TASK](state, { task }) {
    console.log('delete task', task);
    state.tasks = state.tasks.filter((item) => {
      return item._id !== task._id
    })
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
