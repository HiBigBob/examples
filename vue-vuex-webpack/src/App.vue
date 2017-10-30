<template>
  <div id="app">
    <nav class="level">
      <p class="level-item has-text-centered">
        <span class="title-page">
          TODO
        </span>
      </p>
    </nav>
    <div class="container">
      <div class="columns is-mobile">
        <div class="column is-half is-offset-one-quarter">
          <router-view/>
        </div>
      </div>
    </div>
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

.line {
    text-decoration: line-through;
}

input[type=checkbox] { display:none; } /* to hide the checkbox itself */
input[type=checkbox] + label:before {
  font-family: FontAwesome;
  display: inline-block;
}

input[type=checkbox] + label:before { content: "\f096"; } /* unchecked icon */
input[type=checkbox] + label:before { letter-spacing: 10px; } /* space between checkbox and label */

input[type=checkbox]:checked + label:before { content: "\f046"; } /* checked icon */
input[type=checkbox]:checked + label:before { letter-spacing: 5px; } /* allow space for check mark */
</style>
