import Ember from 'ember';

export default Ember.Controller.extend({
  
  //isEditing: false,

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
