<template>
  <a class="panel-block">
    <input type="checkbox" :id="task._id">
    <label :for="task._id" style="width: 90%" v-on:click="changeDone" :class="classDone">
      {{ task.title }}
      <small class="float--right">{{ task.createTime | moment }}</small>
    </label>
    <i v-if="done" class="float--right icon-trash-empty"></i>
  </a>
</template>

<script>
import moment from 'moment'

export default {
  props: ['task'],
  data() {
    return {
      done: false
    }
  },
  computed: {
    classDone: function () {
      return this.done == true ? 'done' : '';
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).fromNow()
    }
  },
  methods: {
    changeDone: function () {
      var done = !this.done
      this.done= done
      this.$emit('change', this.task._id, done)
    }
  }
}
</script>
