import Ember from 'ember';

export default Ember.Component.extend({
	authenticate: Ember.inject.service('authentication'),
	router: Ember.inject.service('-routing'),

	actions: {
		logout() {
	        this.get('authenticate').logout();
	        this.get('router').transitionTo('login');
	    }
	},
});
