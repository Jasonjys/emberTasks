import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    if (this.get('session.isAuthenticated')) {
      console.log("isAuthenticated");
      const email = this.get('session.currentUser.email');
      return this.get('store').query('task', {
        orderBy: 'email',
        equalTo: email
      });
    }
    else {
      console.log('not login');
      this.transitionTo('login');
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
