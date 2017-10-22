import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  sortLists: true,
  sortTasks: true,
  sortedTasks: Ember.computed.sort('listTasks', 'sortDefinitionTasks'),
  sortedLists: Ember.computed.sort('listLists', 'sortDefinitionLists'),

  showFilterLists: Ember.computed('lists', function() {
		return this.get('lists.length');
	}),

  sortDefinitionLists: Ember.computed('sortLists', function() {
	  	let sortOrder = this.get('sortLists') ? 'asc' : 'desc';
	  	return [ `title:${sortOrder}` ];
	}),

  sortDefinitionTasks: Ember.computed('sortTasks', function() {
      let sortOrder = this.get('sortTasks') ? 'asc' : 'desc';
      return [ `title:${sortOrder}` ];
  }),

  _queryChanged: Ember.observer('query', function() {
    Ember.run.debounce(this, function() {
      if (this.get('query').length > 2) {
        this.set('filterBy', this.get('query'));
      } else {
        this.set('filterBy', '');
      }
    }, 200);
  }),

  listTasks: Ember.computed('tasks', 'filterBy', function(){
		let tasks = this.get('tasks');
		let filter = this.get('filterBy');

		if (!Ember.isEmpty(filter)) {
		    tasks = tasks.filter(function(recipe){
            if (recipe.get('title').toLowerCase().indexOf(filter) > -1) {
              this.set('filterByTasks', recipe.get('listId'));
              return recipe;
            }
		    }, this);
		}

		return tasks;
	}),

  listLists: Ember.computed('lists', 'filterByTasks', function(){
		let lists = this.get('lists');
    let filter = this.get('filterByTasks');

    if (!Ember.isEmpty(filter)) {
		    lists = lists.filter(function(recipe){
              return recipe.get('id') == filter;
		    });
		}

		return lists;
	}),

  actions: {
    sortLists() {
			this.toggleProperty('sortLists');
		},

    sortTasks() {
			this.toggleProperty('sortTasks');
		},

    addList(list) {
			console.log('add ' + list);
      //   let list = this.get('store').createRecord('list', {
      //       title: list
      //   });
      //
      //   // list.save();
		},

    addTask(task) {
			console.log('add ' + task);
      //   let task = this.get('store').createRecord('task', {
      //       title: task
      //   });
      //   // task.save();
		},
  }
});
