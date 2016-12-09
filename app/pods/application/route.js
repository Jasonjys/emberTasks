import Ember from 'ember';
export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),
  beforeModel() {
    console.log('application beforeModel');
    // ignore empty sessions
  	return this.get('session').fetch().catch(() => {});
  },
  afterModel() {
    const auth = this.get('firebaseApp').auth();
    var user = auth.currentUser;

    if(!user){
      this.transitionTo('login');
    }else{
      this.transitionTo('tasks');
    }
  },

  actions: {
    willTransition(transition) {
      if(transition.targetName === 'login' || transition.targetName === 'reset') {
        transition.abort();
      }
    }
  }
});