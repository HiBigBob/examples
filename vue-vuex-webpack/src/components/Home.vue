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
          <list-item v-for="list in filteredLists" :key="list._id" :list="list" :element="element" v-on:click="setElement(list)"></list-item>
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
        <task-item v-for="task in filteredTasks" :key="task._id" :task="task" v-on:change="edit" v-on:remove="delete"></task-item>
        <div class="panel-block">
          <add-element :placeholder="placeHolderTodo" v-on:submit="add"></add-element>
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

const headers = {'Authorization': `Bearer ${auth.getToken()}`};

export default {
  data() {
    var element = {}
    return {
      classIsActive: 'is-active',
      showAddForm: false,
      lists: Array,
      tasks: Array,
      searchTask: '',
      searchList: [],
      element: element,
      placeHolderList: 'Add list'
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
    add(value) {
      this.$store.dispatch('addTask', {title: value, listId: this.element.id});
    },
    edit(id, done) {
      this.$store.dispatch('editTask', {id, done});
    },
    delete(id) {
      this.$store.dispatch('deleteTask', {id});
    },
  },
}
</script>

