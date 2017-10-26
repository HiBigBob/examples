import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import auth from '@/auth.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld,
      beforeEnter: (to, from, next) => {
        if (!auth.user.authenticated) {
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
