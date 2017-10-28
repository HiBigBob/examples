<template>
  <div id="app">
    <nav class="level">
      <p class="level-item has-text-centered">
        <span class="title-page">
          TODO
        </span>
      </p>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import "../node_modules/bulma/css/bulma.css";
@import "../node_modules/font-awesome/css/font-awesome.min.css";

#app {
  color: #2c3e50;
  margin-top: 60px;
}

@font-face {
  font-family: 'Display';
  src: url("./assets/DisplayOTF.otf");
}

.title-page {
  font-family: 'Display', Helvetica, Arial, sans-serif;
  font-size: 32px;
  font-weight: bold;
}

.card {
  background-color: #eee;
}
</style>
