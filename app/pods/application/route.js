import Ember from 'ember';
export default Ember.Route.extend({
  beforeModel() {
    if (!this.get('session.isAuthenticated')){
      console.log('in application beforeModel and if');
      this.transitionTo('login');
    }
  }
});