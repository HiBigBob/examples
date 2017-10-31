import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import store from '@/store';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next('/login')
        }

        next()
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
