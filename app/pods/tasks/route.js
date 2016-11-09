import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

  model () {
    const auth = this.get('firebaseApp').auth();
    var user = auth.currentUser;

    if(user){
      console.log("isAuthenticated");

      return RSVP.hash({
        tasks: this.get('store').findRecord('user', user.uid).then((result) => {
          console.log(result);
          console.log('tasks: ', result.get('tasks'));
          return result.get('tasks');
        }),
      })
    }else{
      console.log('not login');
      this.transitionTo('login');
    }
  },
});
