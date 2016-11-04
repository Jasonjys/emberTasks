import Ember from 'ember';

export default Ember.Controller.extend({
  lat: 32.75494243654723,
  lng: -86.8359375,
  zoom: 4,
  
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
