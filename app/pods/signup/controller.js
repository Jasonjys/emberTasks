import Ember from 'ember';

export default Ember.Controller.extend({
	firebaseApp: Ember.inject.service(),

  actions: {
    signUp() {
      const auth = this.get('firebaseApp').auth();
      const email = this.get('email');
      const pass = this.get('password');

      console.log('email: ', email);
      //console.log('password: ', pass);

      auth.createUserWithEmailAndPassword(email, pass).then((userResponse) => {
        console.log('in createUserWithEmailAndPassword.then function');
        const user = this.store.createRecord('user', {
          email: userResponse.email,
        }).then(() => {
          this.transitionToRoute('tasks');
        });
        console.log('user:', user);
        return user.save();
      });
    }
  }
});
