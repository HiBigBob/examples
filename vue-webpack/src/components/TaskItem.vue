<template>
  <a class="panel-block">
    <input type="checkbox" :id="task._id" v-model="task.done">
    <label :for="task._id" style="width: 90%" v-on:click="changeDone" :class="classDone">
      {{ task.title }}
      <small class="is-pulled-right">{{ task.createTime | moment }}</small>
    </label>
  </a>
</template>

<script>
import moment from 'moment'

export default {
  props: ['task'],
  computed: {
    classDone: function () {
      return this.task.done ? 'line' : '';
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).fromNow()
    }
  },
  methods: {
    changeDone: function () {
      this.$emit('change', this.task._id, !this.task.done)
    }
  }
}
</script>
