import Ember from 'ember';

export default Ember.Controller.extend({
  //gMap: Ember.inject.service(),

  lat: 32.75494243654723,
  lng: -86.8359375,
  //place: null,
  zoom: 17,
  
  actions: {
    edit: function(task) {
      task.set('isEditing', true);
    },
    save: function(task) {
      task.set('isEditing', false);
      return true;
    },
    didUpdatePlace: function(attr){
      console.log(attr);
      this.set('lat', attr.lat);
      this.set('lng', attr.lng);

      console.log("lat: ", this.get('lat'));
      console.log("lng: ", this.get('lng'));
    }
  }
});
