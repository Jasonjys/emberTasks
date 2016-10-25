import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    if (this.get('session.isAuthenticated')) {
      console.log("session.isAuthenticated")
      console.log(this.get('store').findAll('task'))
      return this.get('store').findAll('task');
    }
  },
});
