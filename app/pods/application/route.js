import Ember from 'ember';
export default Ember.Route.extend({
  beforeModel() {
    return this.get('session').fetch().catch(function() {});
  },
  
  model() {
    if (!this.get('session.isAuthenticated')){
      console.log('in application beforeModel and if');
      this.transitionTo('login');
    }
  }
});