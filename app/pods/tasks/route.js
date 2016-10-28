import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    if (this.get('session.isAuthenticated')) {
      const email = this.get('session.currentUser.email');
      return this.get('store').query('task', {
        orderBy: 'email',
        equalTo: email
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
