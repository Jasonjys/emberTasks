import Ember from 'ember';

export default Ember.Controller.extend({
  lat: 56.130366,
  lng: -106.34677099999999,
  zoom: 3,
  
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
      this.set('zoom', 17);

      let markersArray = this.get('markers');
      let marker = markersArray.objectAt(0);
      marker.lat = attr.lat;
      marker.lng = attr.lng;

      markersArray.arrayContentDidChange(0);
    }
  }
});
