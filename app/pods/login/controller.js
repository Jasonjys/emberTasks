import Ember from 'ember';

export default Ember.Controller.extend({
  isModalVisible: false,
  actions: {
    signIn(provider) {
      this.set('badEmail', false);
      this.set('badPassword', false);
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
      .catch((error) => {
        //debugger
        const errorCode = error.code;
        if(errorCode === 'auth/invalid-email'){
        
          this.set('badEmail', true);
          //this.set('errorMessage', 'Invalid email format.');
        } else {
          this.set('isModalVisible', true);
          // this.set('badPassword', true);
          // this.set('errorMessage', 'The email and password do not match');
        }
      });
    },

    hideMessage() {
      if(this.get('badEmail') || this.get('badPassword')){
        this.set('errorMessage', '');
      }
    }
  }
});
