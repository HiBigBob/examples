import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('ok', false)) {
          next('/login')
        }

        next()
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
