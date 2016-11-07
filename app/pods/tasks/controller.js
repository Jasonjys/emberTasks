import Ember from 'ember';

export default Ember.Controller.extend({
  // markers: Ember.A([
  //   {
  //     id: 'marker1',
  //     lat: this.get('lat'),
  //     lng: this.get('lng')
  //   }
  // ]),
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
