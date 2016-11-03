import Ember from 'ember';
export default Ember.Route.extend({

  beforeModel () {
    return this.get('session').fetch().catch(function() {});
  },
  actions: {
    signOut: function() {
      console.log('in signOut function');
      this.transitionTo('login');
      this.get('session').close();
    }
  }
});