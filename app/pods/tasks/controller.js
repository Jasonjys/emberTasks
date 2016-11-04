import Ember from 'ember';

export default Ember.Controller.extend({
  gMap: Ember.inject.service(),

  lat: 32.75494243654723,
  lng: -86.8359375,
  //place: null,
  zoom: 17,
  markers: Ember.A([
        {
          lat: 32.75494243654723, // Required
          lng: -86.8359375, 
          }      // Required}
      ]),
  
  actions: {
    edit: function(task) {
      task.set('isEditing', true);
    },
    save: function(task) {
      task.set('isEditing', false);
      return true;
    },
    didUpdatePlace: function(attr){
      console.log("head",this.get('markers').get(0));
      this.set('lat', attr.lat);
      this.set('lng', attr.lng);
      this.get('markers').popObject();
      this.get('markers').pushObject( {
          lat: attr.lat, // Required
          lng: attr.lng, 
          });
      console.log(this.get('markers'));
    }
  }

});
