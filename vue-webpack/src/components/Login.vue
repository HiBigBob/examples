<template>
    <div class="container">
      <div class="columns is-mobile">
        <div class="column is-half is-offset-one-quarter">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">Login</p>
                  <p class="subtitle is-6">{{msg}}</p>
                </div>
              </div>

              <div class="content">
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                    <input
                      type="text"
                      class="input"
                      placeholder="Enter your email"
                      v-model="credentials.username"
                    >
                  </div>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control">
                    <input
                      class="input"
                      type="password"
                      placeholder="Enter your password"
                      v-model="credentials.password"
                    >
                  </div>
                </div>
                <div class="columns is-mobile">
                  <div class="column is-2 is-offset-10">
                      <div class="control">
                        <button class="button is-link">Login</button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import auth from '../auth.js'

export default {
  name: 'HelloWorld',
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: '',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    submit() {
      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }

      auth.login(this, credentials, 'secretquote').then(() => {
        this.$router.go('/')
      });
    }
  }
}
</script>
