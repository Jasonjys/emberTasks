import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    signIn: function(provider) {
      this.get('session').open('firebase', { provider: provider }).then(function(data) {
        console.log(data.currentUser);
        this.transitionToRoute('tasks.new');
      });
    },
    signOut: function() {
      this.get('session').close();
    }
  }
});
