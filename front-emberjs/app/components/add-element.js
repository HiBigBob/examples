import Ember from 'ember';

export default Ember.Component.extend({
  keyPress(event) {
    if (event.keyCode === 13) {
      this.get('onSubmit')(this.get('elem'));
      this.set('elem', null);
    }
  }
});
