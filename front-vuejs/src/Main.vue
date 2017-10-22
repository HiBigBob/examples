<template>
  <div container="">
    <header row="" class="siteHeader">
      <div column="8">
        <h1 class="logo">Todo</h1>
      </div>
      <div column="4" class="nav-action">
        <div tabindex="0" class="dropdown label">
          <i class="icon-user icon-white"></i> John
          <ul class="dropdown-content">
            <li><router-link to="/">Home</router-link></li>
            <li v-if="!user.authenticated"><router-link to="/login" >Login</router-link></li>
            <li v-if="!user.authenticated"><router-link to="/signup" @click="test()">Sign Up</router-link></li>
            <li v-if="user.authenticated"><a @click="test()">Logout</a></li>
          </ul>
        </div>
      </div>
    </header>

    <main class="siteContent">
      <router-view></router-view>
    </main>

    <footer class="siteFooter">
      <p>Todo by Adrien Bouttier</p>
    </footer>
  </div>
</template>

<script>
import auth from './auth'

export default {
  data() {
    return {
      user: auth.user
    }
  },

  methods: {
    test() {
      console.log('testst')
    },
    logout() {
      auth.logout()
    }
  }
}
</script>
