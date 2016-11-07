import Ember from 'ember';

export default Ember.Controller.extend({
	//session: Ember.inject.service('session'),
	
  actions: {
    signIn: function(provider) {
      console.log('in signIn function');
      let authPromise;
      if (provider === 'password') {
        console.log('provider is password');
        authPromise = this.get('session').open('firebase', {
          provider: provider,
          email: this.get('email'),
          password: this.get('password')
        });
      } else {
        authPromise = this.get('session').open('firebase', {
          provider: provider,
        });
      }
      authPromise.then(result => {
        console.log('session.open result:', result);
        console.log(result.currentUser.email);
        this.transitionToRoute('users.tasks');
      })
      .catch(err => console.warn('session.open error:', err));
    }
  }
});
