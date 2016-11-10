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
        return user.save().then(() => {
          this.get('session').open('firebase', {
            provider: 'password',
            email: email,
            password: pass
          });
        })
      }).then(() => {
        this.transitionToRoute('tasks');
      });
    }
  }
});
