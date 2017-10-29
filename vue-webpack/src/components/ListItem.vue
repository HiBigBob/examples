<template>
  <a :class="classActive" v-on:click="onClick">
    {{ list.title }}
  </a>
</template>

<script>
import moment from 'moment'

export default {
  props: ['list', 'active', 'element'],
  data() {
    return {
      isActive: this.list._id == this.element ? 'is-active' : ''
    }
  },
  computed: {
    classActive: function () {
      return this.list._id == this.element.id ? 'is-active' : '';
    }
  },
  methods: {
    onClick: function () {
      this.$emit('click')
    }
  }
}
</script>
