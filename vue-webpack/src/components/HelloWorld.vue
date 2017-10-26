<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
