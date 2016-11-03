import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel () {
    return this.get('session').fetch().catch(function() {});
  },
  actions: {
    signIn: function(provider) {
      this.get('session').open('firebase', { provider: provider}).then((data) => {
        console.log(data.currentUser);
        console.log(data.currentUser.email);
        this.transitionTo('tasks');
      });
    },
    signOut: function() {
      console.log('in signOut function');
      this.transitionTo('login');
      this.get('session').close();
    }
  }
});
