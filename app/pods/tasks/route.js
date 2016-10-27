import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    if (this.get('session.isAuthenticated')) {
      let user = this.get('session.currentUser.displayName');
      console.log(user);

      var returnValue = this.get('store').query('task', {
        filter: {
          user: user
        }
      });
      console.log(returnValue);
      return this.get('store').query('task', {
        filter: {
          user: user
        },
        //orderBy: 'date'
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
