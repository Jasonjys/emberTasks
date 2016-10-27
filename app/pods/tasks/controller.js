import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    edit: function(task) {
      task.set('isEditing', true);
    },
    save: function(task) {
      task.set('isEditing', false);
      return true;
    }
  }
});
