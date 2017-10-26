<template>
<div>
    <div row="" >
      <div column="4 +8">
        <input placeholder="Search" v-model="searchTask">
      </div>
    </div>
    <div row="" >
      <div column="4">
        <div class="collection">
          <div class="collection-header" >
            <h3>
              <span @click="setElement('')">Lists of tasks</span>
              <i class="icon-sort" @click="setSortLists" style="font-size: 16px;"></i>
            </h3>
          </div>

          <div class="collection-item" v-for="list in filteredLists" @click="setElement(list._id, list.title)">
              <i v-if="list._id == element.id" class="icon-right-open"></i>
              {{ list.title }}
          </div>
          <add-element :placeholder="placeHolderList" v-on:add="addList"></add-element>
        </div>
      </div>
      <div column="8">
        <div class="collection">
          <div class="collection-header">
            <h3>
              Tasks
              <i class="icon-sort" @click="setSortTasks" style="font-size: 16px;"></i>
            </h3>
          </div>

          <task-item v-for="task in filteredTasks" :task="task" v-on:change="change"></task-item>
          <add-element :placeholder="placeHolderTodo" v-on:add="addTodo"></add-element>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import moment from 'moment'

export default {

  data() {
    var sortTasks = 1
    var sortLists = 1
    var element = {}
    return {
      lists: Array,
      tasks: Array,
      searchTask: '',
      searchList: [],
      element: element,
      sortTasks: sortTasks,
      sortLists: sortLists,
      placeHolderList: 'Add list'
    }
  },

  created: function () {
    this.getData()
  },

  computed: {
    filteredTasks: function () {
      var tasks = this.tasks

      if (tasks.length == 0) {
        return;
      }

      var order = this.sortTasks
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

      if (tasks.length > 1 && order) {
        tasks = tasks.slice().sort(function (a, b) {
          a = a.title
          b = b.title
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }

      return tasks
    },

    filteredLists: function () {
      var lists = this.lists
      var order = this.sortLists

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

      if (lists.length > 1 && order) {
        lists = lists.slice().sort(function (a, b) {
          a = a.title
          b = b.title
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
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
    setElement(_id, _title) {
      this.element = {
        id: _id,
        title: _title
      };
    },

    setSortTasks() {
      this.sortTasks = this.sortTasks * -1
    },

    setSortLists() {
      this.sortLists = this.sortLists * -1
    },

    change(id, done) {
      this.total += 1
    },

    getData() {
      this.$http.get('http://localhost:3000/lists', { headers: auth.getAuthHeader() }).then((response) => {
            console.log(JSON.parse(JSON.stringify(response.body)))
            this.lists = JSON.parse(JSON.stringify(response.body));
      }, (response) => {
        console.log(response)
      })

      this.$http.get('http://localhost:3000/tasks', { headers: auth.getAuthHeader() }).then((response) => {
            console.log(JSON.parse(JSON.stringify(response.body)))
            this.tasks = JSON.parse(JSON.stringify(response.body));
      }, (response) => {
        console.log(response)
      })
    },

    addTodo(value) {
      this.$http.post('http://localhost:3000/tasks', {
        title: value,
        listId: this.element.id
      }, {
        headers: auth.getAuthHeader()
      }).then((response) => {
        if (response.status == 200) {
          this.tasks.push(JSON.parse(JSON.stringify(response.body)))
        }
      }, (response) => {
        console.log(response)
      });
    },

    addList(value) {
      this.$http.post('http://localhost:3000/lists', {
        title: value
      }, {
        headers: auth.getAuthHeader()
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
