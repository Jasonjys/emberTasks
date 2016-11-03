import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),
	
  actions: {
    signIn: function(provider) {
      this.get('session').open('firebase', { provider: provider}).then((data) => {
        console.log(data.currentUser);
        console.log(data.currentUser.email);
        this.transitionTo('tasks');
      });
    }
  }
});
