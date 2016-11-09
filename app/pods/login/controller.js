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
        if(!this.get('store').hasRecordForId('user', result.uid)){
          console.log('user not exist');
          this.get('store').createRecord('user', {
            id: result.uid,
            email: result.currentUser.email,
          }).save();
        }
        console.log('session.open result:', result);
        console.log(result.currentUser.email);
        this.transitionToRoute('tasks');
      })
      .catch(err => console.warn('session.open error:', err));
    }
  }
});
