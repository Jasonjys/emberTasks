import Ember from 'ember';

export default Ember.Controller.extend({
	firebaseApp: Ember.inject.service(),

  actions: {
    signUp() {
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
        this.set('badEmail', false);
        this.set('badPassword', false);
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use'){
          this.set('badEmail', true);
          this.set('errorMessage', errorMessage);
        } else if (errorCode === 'auth/invalid-email'){
          this.set('badEmail', true);
          this.set('errorMessage', 'Invalid email');
        } else {
          this.set('badPassword', true);
          this.set('errorMessage', errorMessage);
        }
      });
    }
  }
});
