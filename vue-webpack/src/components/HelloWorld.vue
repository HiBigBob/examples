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
          <list-item v-for="list in filteredLists" :list="list" :element="element" v-on:click="setElement(list)"></list-item>
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
        <task-item v-for="task in filteredTasks" :task="task" v-on:change="change"></task-item>
        <div class="panel-block">
          <add-element :placeholder="placeHolderTodo" v-on:add="addTodo"></add-element>
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

  created: function () {
    this.getData()
  },

  computed: {
    isActive: function(list) {
      return list._id == this.element.id
    },
    filteredTasks: function () {
      var tasks = this.tasks

      if (tasks.length == 0) {
        return;
      }

      if (this.element.id) {
        tasks = tasks.filter(function (row) {
          return row.listId == this.element.id
        }, this)
      }

      if (this.searchTask.length > 2) {
        tasks = tasks.filter(function (row) {
          if (row.title.toLowerCase().indexOf(this.searchTask.toLowerCase().trim()) != -1) {
            this.searchList.push(row.listId);
            return row;
          }
        }, this)
      } else {
        this.searchList = [];
      }

      return tasks
    },

    filteredLists: function () {
      var lists = this.lists

      if (this.searchList.length) {
        var tmpLists = [];
        lists.forEach(function (list) {
          this.searchList.forEach(function (item) {
            if (list._id == item) {
              tmpLists.push(list)
            }
          }, this)
        }, this)
        lists = tmpLists;
      }

      return lists
    },

    placeHolderTodo: function () {
      var text = this.element.title == undefined ? '' : 'on "' + this.element.title + '" list';
      return 'Add task ' + text;
    }
  },

  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },

  methods: {
    setElement(list) {
      if (list) {
        this.element = {
          id: list._id,
          title: list.title
        };
      } else {
        this.element = {};
      }
    },

    change(id, done) {
      this.total += 1
    },

    getData() {
      Vue.http.get('/lists').then((response) => {
            console.log(JSON.parse(JSON.stringify(response.data)))
            this.lists = JSON.parse(JSON.stringify(response.data));
      }, (response) => {
        console.log(response)
      })

      Vue.http.get('/tasks').then((response) => {
            console.log(JSON.parse(JSON.stringify(response.data)))
            this.tasks = JSON.parse(JSON.stringify(response.data));
      }, (response) => {
        console.log(response)
      })
    },

    addTodo(value) {
      Vue.http.post('/tasks', {
        title: value,
        listId: this.element.id
      }).then((response) => {
        if (response.status == 200) {
          this.tasks.push(JSON.parse(JSON.stringify(response.body)))
        }
      }, (response) => {
        console.log(response)
      });
    },

    addList(value) {
      Vue.http.post('/lists', {
        title: value
      }).then((response) => {
        if (response.status == 200) {
          this.lists.push(JSON.parse(JSON.stringify(response.body)))
        }
      }, (response) => {
        console.log(response)
      });
    },
  },

  route: {
    canActivate() {
      return auth.user.authenticated
    }
  }

}
</script>

