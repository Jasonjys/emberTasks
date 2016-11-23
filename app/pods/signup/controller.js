import Ember from 'ember';

export default Ember.Controller.extend({
	firebaseApp: Ember.inject.service(),

  emailValidation: [{
    message: 'Invalid email format.',
    validate: (inputValue) => {
      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(inputValue);
    }
  }],

  actions: {
    hideEmailMessage(){
      this.set('emailError', []);
    },

    hidePassMessage(){
      this.set('passwordError', []);
    },

    signUp() {
      this.set('badEmail', false);
      this.set('badPassword', false);
      const auth = this.get('firebaseApp').auth();
      const email = this.get('email');
      const pass = this.get('password');

      auth.createUserWithEmailAndPassword(email, pass).then((userResponse) => {
        console.log('in createUserWithEmailAndPassword function');
        const user = this.store.createRecord('user', {
          id: userResponse.uid,
          email: userResponse.email,
        });
        user.save().then(() => {
          this.get('session').open('firebase', {
            provider: 'password',
            email: email,
            password: pass
          }).then(() => {
            this.transitionToRoute('tasks');
          });
        });
      }).catch((error) => {
        console.log('error: ', error)
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use'){
          this.set('emailError', ['The email address is already in use by another account.']);
        } else if(errorCode === 'auth/argument-error'){
          this.set('emailError', ['Email can not be empty']);
        } else if(errorCode === "auth/invalid-email"){
          return;
        } else {
          this.set('passwordError', ['Password should be at least 6 characters']);
        }
      });
    }
  }
});
