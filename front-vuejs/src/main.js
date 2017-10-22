import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './Main.vue'
import auth from './auth'
import VueResource from 'vue-resource'

// 1. Use plugin.
Vue.use(VueResource)
Vue.use(VueRouter)

// 2. Define components
import Home from './components/Home.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import taskItem from './components/TaskItem.vue'
import addElement from './components/AddElement.vue'
Vue.component('task-item', taskItem);
Vue.component('add-element', addElement);

// 3. Check authentification
auth.checkAuth()

// 3. Create the router
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup }
  ]
})

// 4. Create and mount root instance.
new Vue({
  router,
  render: h => h(Main)
}).$mount('#app')
