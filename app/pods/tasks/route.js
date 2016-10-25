import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    if (this.get('session.isAuthenticated')) {
      this.get('store').findAll('task');
    }
  },
});
