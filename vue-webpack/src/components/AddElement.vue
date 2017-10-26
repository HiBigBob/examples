<template>
    <input :placeholder="placeholder" v-model="newElement" @keyup.enter="addElement">
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
      this.$emit('add', value)
    }
  }
}
</script>
