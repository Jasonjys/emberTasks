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
    signUp() {
      this.set('badEmail', false);
      this.set('badPassword', false);
      const auth = this.get('firebaseApp').auth();
      const email = this.get('email');
      const pass = this.get('password');

      if(!email){
        this.set('badEmail', true);
        this.set('errorMessage', 'Email can not be empty');
        return;
      } else if (!pass) {
        this.set('badPassword', true);
        this.set('errorMessage', 'Password can not be empty');
        return;
      }

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
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use'){
          this.set('badEmail', true);
          this.set('errorMessage', errorMessage);
        } else if (errorCode === 'auth/invalid-email'){
          this.set('badEmail', true);
          this.set('errorMessage', 'Invalid email format');
        } else if(errorCode === 'auth/argument-error'){
          this.set('badEmail', true);
          this.set('errorMessage', 'Email can not be empty');
        } else {
          this.set('badPassword', true);
          this.set('errorMessage', errorMessage);
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
