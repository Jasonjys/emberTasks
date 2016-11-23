import Ember from 'ember';

export default Ember.Controller.extend({
  isModalVisible: false,
  // emailValidation: [{
  //   message: 'Invalid email format',
  //   validate: (inputValue) => {
  //     let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //     return emailPattern.test(inputValue);
  //   }
  // }],
  actions: {
    hideEmailMessage(){
      this.set('emailError', []);
    },
    hidePassMessage(){
      this.set('passwordError', []);
    },
    signIn(provider) {
      let authPromise;
      console.log('in signIn function');
      const email = this.get('email');
      const password = this.get('password');
      if (provider === 'password') {
        console.log('provider is password');
        authPromise = this.get('session').open('firebase', {
          provider: provider,
          email: email,
          password: password
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
        console.log('error');
        console.log(error);
        const errorCode = error.code;
        console.log(errorCode)

        if(errorCode === 'auth/invalid-email'){
          this.set('emailError', ['Invalid email format']);
        } else {
          console.log('in else');
          this.set('passwordError', ['The email and password do not match']);
        }
      });
    },
  }
});
