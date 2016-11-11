import Ember from 'ember';

export default Ember.Controller.extend({
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
      authPromise.then((result) => {
        this.store.findRecord('user', result.uid).then((success) => {
          console.log('exist');
        }, (error) => {
          this.get('store').createRecord('user', {
            id: result.currentUser.uid,
            email: result.currentUser.email
          }).save();
        })
        .then(() => {
          this.transitionToRoute('tasks');
        });
        console.log('session.open result:', result);
        console.log(result.currentUser.email);
      })
      .catch(err => console.warn('session.open error:', err));
    }
  }
});
