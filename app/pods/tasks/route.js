import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

  model () {
    const auth = this.get('firebaseApp').auth();
    var user = auth.currentUser;

    if(user){
      console.log("isAuthenticated");

      // return {
      //   tasks: DS.PromiseArray.create({
      //     promise: this.get('store').findRecord('user', user.uid).then((result) => {
      //       console.log('tasks: ', result.get('tasks'));
      //       return result.get('tasks');
      //     })
      //   })
      // };
      return Ember.RSVP.hash({
        tasks: this.get('store').findRecord('user', user.uid).then((result) => {
          return result.get('tasks');
        })
      });
    }else{
      console.log('not login');
      this.transitionTo('login');
    }
  }
});
