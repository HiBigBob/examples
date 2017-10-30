<template>
    <div class="control">
      <input class="input is-small" :placeholder="placeholder" v-model="newElement" @keyup.enter="addElement">
    </div>
</template>

<script>
export default {
  props: [
    'placeholder'
  ],
  data() {
    return {
      newElement: ''
    }
  },
  methods: {
    addElement: function () {
      var value = this.newElement && this.newElement.trim()
      if (!value) {
        return
      }
      this.newElement = ''
      this.$emit('submit', value)
    }
  }
}
</script>
