<template>
  <div container>
    <div row>
      <div column="6 +3">
        <h2>Sign Up</h2>
        <form>
          <p>
            <label for="name">Username:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter your username"
              v-model="credentials.username"
            >
          </p>
          <p>
            <label for="name">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              v-model="credentials.password"
            >
          </p>
          <div class="alert alert--error" v-if="error">
            <p><strong>Error!</strong>{{ error }}</p>
          </div>
          <button class="button--xsm" @click="submit()">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../auth'

export default {

  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },

  methods: {

    submit() {

      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }

      auth.signup(this, credentials, 'secretquote')
    }
  }
}
</script>
