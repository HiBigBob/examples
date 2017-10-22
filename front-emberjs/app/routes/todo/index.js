import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    if (!this.controllerFor('login').get('authenticate').get('userIsLoggedIn')) {
      var loginController = this.controllerFor('login');
      loginController.set('previousTransition', transition);
      this.transitionTo('login');
    }
  },
  model: function() {
    return Ember.RSVP.hash({
			lists: this.store.findAll('list'),
			tasks: this.store.findAll('task')
		});
  }
});
