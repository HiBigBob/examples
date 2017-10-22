import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    if (this.controllerFor('login').get('authenticate').get('userIsLoggedIn')) {
      this.transitionTo('index');
    }
  }
});
