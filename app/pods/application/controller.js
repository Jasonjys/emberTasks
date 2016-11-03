import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
    signOut: function() {
      console.log('in signOut function');
      this.get('session').close()
      .then(() => {
      	this.transitionToRoute('application');
      });
    }
  }
});