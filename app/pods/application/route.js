import Ember from 'ember';
export default Ember.Route.extend({
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  },
  actions: {
    signIn: function(provider) {
      this.get('session').open('firebase', { provider: provider}).then(function(data) {
        //console.log(data.currentUser);
        console.log(data.currentUser.displayName);
        //this.transitionTo('tasks');
      });
    },
    signOut: function() {
      this.get('session').close();
    }
  }
});