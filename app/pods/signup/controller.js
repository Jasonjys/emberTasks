import Ember from 'ember';
import DS from 'ember-data';

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
        console.log('in createUserWithEmailAndPassword function');
        const user = this.store.createRecord('user', {
          id: userResponse.uid,
          email: userResponse.email,
          //tasks: DS.hasMany('task', { async: true, inverse: null })
          //tasks: null
        });
        console.log('user:', user);
        return user.save();
      });
    }
  }
});
