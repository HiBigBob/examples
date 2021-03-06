// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store';

import auth from '@/auth.js'
import taskItem from './components/TaskItem.vue'
import listItem from './components/ListItem.vue'
import addElement from './components/AddElement.vue'

Vue.component('task-item', taskItem);
Vue.component('list-item', listItem);
Vue.component('add-element', addElement);

axios.defaults.baseURL = 'http://localhost:4021';
axios.defaults.headers.common['Authorization'] = `Bearer ${auth.getToken()}`;

Vue.http = Vue.prototype.$http = axios;

Vue.config.productionTip = false

auth.checkAuth()

/* eslint-disable no-new */
new Vue({
  store,
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
