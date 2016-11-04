import Ember from 'ember';

export default Ember.Controller.extend({
  //gMap: Ember.inject.service(),

  lat: 32.75494243654723,
  lng: -86.8359375,
  //place: null,
  zoom: 17,
  
  markers: Ember.A([
    {
      id: 'marker1',
      lat: null,
      lng: null,
    }
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
      this.set('lat', attr.lat);
      this.set('lng', attr.lng);

      let markersArray = this.get('markers');
      let marker = markersArray.objectAt(0);
      marker.lat = attr.lat;
      marker.lng = attr.lng;

      markersArray.arrayContentDidChange(0);
    }
  }
});
