import _ from 'lodash';

import request from '@/store/request';
import * as types from '@/store/mutation-types';

const filter = (state) => {
  let tasks = state.originTasks
  let lists = state.originLists

  if (tasks.length == 0) {
    return;
  }

  if (state.element.id) {
    tasks = tasks.filter(function (row) {
      return row.listId == state.element.id
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

  state.tasks = tasks;
  state.lists = lists;

  return state
};

// initial state
const state = {
  originLists: [],
  originTasks: [],
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
      commit(types.RECEIVE_ADD_TASK, { task });
    });
  },
  editTask({ commit }, task) {
    request.editTask(task).then((task) => {
      commit(types.RECEIVE_EDIT_TASK, { task });
    });
  },
  deleteTask({ commit }, task) {
    request.deleteTask(task).then((res) => {
      commit(types.RECEIVE_DELETE_TASK, { task });
    });
  },
  launchSearch({ commit }, search) {
    commit(types.RECEIVE_SEARCH, {search});
  },
  selectElement({ commit }, element) {
    console.log('element',element)
    commit(types.RECEIVE_ELEMENT, {element});
  },
};

// mutations
const mutations = {
  [types.RECEIVE_LISTS](state, { lists }) {
    state.originLists = lists;
    state = filter(state);
  },

  [types.RECEIVE_TASKS](state, { tasks }) {
    state.originTasks = tasks;
    state = filter(state);
  },

  [types.RECEIVE_SEARCH](state, { search }) {
    state.searchTask = search;
    state = filter(state);
  },

  [types.RECEIVE_ELEMENT](state, { element }) {
    state.element = element;
    state = filter(state);
  },

  [types.RECEIVE_ADD_TASK](state, { task }) {
    state.tasks.push(task);
    state = filter(state);
  },

  [types.RECEIVE_EDIT_TASK](state, { task }) {
    state.tasks.map((item) => {
      if (item._id !== task._id) return item
      return Object.assign({}, item, task)
    })
  },

  [types.RECEIVE_DELETE_TASK](state, { task }) {
    state.tasks = state.tasks.filter((item) => {
      return item._id !== task.id
    })
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
