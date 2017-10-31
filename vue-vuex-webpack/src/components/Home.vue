<template>
  <div class="card">
    <div class="content">
      <div class="panel">
        <div class="panel-block">
          <p class="control has-icons-left">
          <input class="input is-small" type="text" placeholder="search" v-model="searchTask">
          <span class="icon is-small is-left">
            <i class="fa fa-search"></i>
          </span>
          </p>
        </div>
        <p class="panel-tabs" v-if="!showAddForm" style="margin-bottom:0">
          <a @click="setElement()">All</a>
          <list-item v-for="list in lists" :key="list._id" :list="list" :element="element" v-on:click="setElement(list)"></list-item>
          <a class="" @click="() => this.showAddForm = !this.showAddForm">
            <i class="fa fa-plus-square"></i>
          </a>
        </p>
        <p class="panel-tabs" v-if="showAddForm" style="margin-bottom:0">
          <a>
            <add-element :placeholder="placeHolderList" v-on:add="addList"></add-element>
          </a>
          <a class="" @click="() => this.showAddForm = !this.showAddForm">
            <i class="fa fa-minus-square"></i>
          </a>
        </p>
        <task-item v-for="task in tasks" :key="task._id" :task="task" v-on:change="editItem" v-on:remove="deleteItem"></task-item>
        <div class="panel-block">
          <add-element :placeholder="placeHolderTodo" v-on:submit="addItem"></add-element>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import auth from '@/auth.js'
import {
  mapGetters,
  mapActions,
} from 'vuex';

export default {
  data() {
    return {
      classIsActive: 'is-active',
      showAddForm: false,
      placeHolderList: 'Add list',
      placeHolderTodo: 'Add task'
    }
  },

  created() {
    this.$store.dispatch('getLists');
    this.$store.dispatch('getTasks');
  },

  computed: mapGetters({
    lists: 'lists',
    tasks: 'tasks',
    element: 'element',
    searchList: 'searchList',
    searchTask: 'searchTask',
  }),

  methods: {
    ...mapActions([
      'launchSearch',
      'selectElement',
      'addTask',
      'editTask',
      'deleteTask',
    ]),
    setElement(list) {
      this.$store.dispatch('selectElement', { id: list._id, title: list.title });
    },
    addItem(value) {
      this.$store.dispatch('addTask', {title: value, listId: this.element.id});
    },
    editItem(id, done) {
      this.$store.dispatch('editTask', {id, done});
    },
    deleteItem(id) {
      this.$store.dispatch('deleteTask', {id});
    },
  },
}
</script>

