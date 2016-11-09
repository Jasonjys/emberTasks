import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

  model () {
    console.log('in tasks model hook')
    const auth = this.get('firebaseApp').auth();
    var user = auth.currentUser;

    if(user){
      console.log("isAuthenticated");

      return RSVP.hash({
        tasks: this.get('store').findRecord('user', user.uid).then((result) => {
          return result.get('tasks')
        }),
      })
    }else{
      console.log('not login');
      this.transitionTo('login');
    }
  },

  actions:{
    save: function() {
      var controller = this.get('controller'),
      task = controller.get('model');

      return task.save();
    }
  }
});
