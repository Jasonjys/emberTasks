import Ember from 'ember';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

  model () {
    const auth = this.get('firebaseApp').auth();
    var user = auth.currentUser;
    if(user){
      console.log("isAuthenticated");

      this.get('store').findRecord('user', user.uid).then((user) => {
        console.log(user.get('tasks'));
        return user.get('tasks');
      });
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
