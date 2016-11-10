import Ember from 'ember';
import DS from 'ember-data'
import RSVP from 'rsvp';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

  model () {
    const auth = this.get('firebaseApp').auth();
    var user = auth.currentUser;

    if(user){
      console.log("isAuthenticated");

      return {
        tasks: DS.PromiseArray.create({
          promise: this.get('store').findRecord('user', user.uid).then((result) => {
            console.log('tasks: ', result.get('tasks'));
            return result.get('tasks');
          }, (error) => {
            console.log('no user exist')
          })
        })
      }
    }else{
      console.log('not login');
      this.transitionTo('login');
    }
  },
});
