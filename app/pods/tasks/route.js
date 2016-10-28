import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    if (this.get('session.isAuthenticated')) {
      let email = this.get('session.currentUser.email');
      console.log(email);
      console.log("filtered tasks: ",this.get('store').query('task', {
        equalTo: this.get('session.currentUser.email')
      }));
      return this.get('store').query('task', {
        //equalTo: this.get('session.currentUser.email')
      });
    }
  },
  actions:{
    save: function() {
      var controller = this.get('controller'),
        task = controller.get('model');

      return task.save();
    },
  }
});
