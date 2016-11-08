import Ember from 'ember';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),
  gMap: Ember.inject.service(),

  model () {
    const auth = this.get('firebaseApp').auth();
    var user = auth.currentUser;
    if(user){
      console.log("isAuthenticated");
      //const email = this.get('session.currentUser.email');
      console.log('task: ', this.get('store').findAll('task'));
      //return this.get('store').findAll('user');

      // let newUser = this.store.createRecord('user', {
      //     // id: user.uid,
      //     email: user.email
      // })

      // newUser.save()

      // debugger
      // user.updateEmail("user@example.com").then(function() {
      //   // Update successful.
      // }, function(error) {
      //   // An error happened.
      // });
    }else {
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
