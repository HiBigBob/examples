<template>
  <a class="panel-block">
    <input type="checkbox" :id="task._id" v-model="task.done">
    <label :for="task._id" style="width: 90%" v-on:click="changeTask" :class="classDone">
      {{ task.title }}
      <small class="is-pulled-right">{{ task.createTime | moment }}</small>
    </label>
    <i v-if="task.done" class="fa fa-trash-o" style="padding-left: 5px" v-on:click="deleteTask" />
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
    changeTask: function () {
      this.$emit('change', this.task._id, !this.task.done)
    },
    deleteTask: function () {
      this.$emit('remove', this.task._id)
    }
  }
}
</script>
