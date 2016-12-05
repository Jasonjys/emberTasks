import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),

  lat: 56.130366,
  lng: -106.34677099999999,
  zoom: 3,
  location: '',
  markers: Ember.A([
    {
      id: 'marker1',
      lat: null,
      lng: null,
    }
  ]),

  init: function() {
    this.set('task',  Ember.Object.create());
  },
  taskIsValid: function() {
    var isValid = true;
    ['task.title', 'task.date'].forEach(function(field) {
      if (this.get(field) === '' || Ember.typeOf(this.get(field)) === 'undefined') {
        isValid = false;
      }
    }, this);
    return isValid;
  },
  actions: {
    addTask: function() {
      if (!this.taskIsValid()) {
        alert("Missing task title or due date");
        return; 
      }
      console.log(this.get('task.location'))
      console.log(this.get('lat'))
      console.log(this.get('lng'))

      var newTask = this.store.createRecord('task', {
        title: this.get('task.title'),
        date: this.get('task.date'),
        description: this.get('task.description'),
        location: this.get('location'),
        position: {
          lat: this.get('lat'),
          lng: this.get('lng')
        },
        markers: [{
          lat: this.get('lat'),
          lng: this.get('lng')
        }],
      });

      console.log(newTask)
      console.log(newTask.title)

      const auth = this.get('firebaseApp').auth();
      var user = auth.currentUser;

      this.get('store').findRecord('user', user.uid).then((user) => {
        user.get('tasks').addObject(newTask);
        newTask.save().then(() => {
          user.save()
          .then(() => {
            this.setProperties({
              'task.title': '',
              'task.date': '',
              'task.description': '',
              'task.location':'',
              'task.position':'',
              'task.markers':'',
            });
            this.transitionToRoute('tasks');
          });
        });
      });
    },
    didUpdatePlace: function(attr){
      this.set('lat', attr.lat);
      this.set('lng', attr.lng);
      this.set('zoom', 17);
      this.set('location',attr.place.formatted_address)
      // console.log("map's lat",this.get('lat'));
      // console.log("map's lng",this.get('lng'));
      let markersArray = this.get('markers');
      let marker = markersArray.objectAt(0);
      marker.lat = attr.lat;
      marker.lng = attr.lng;

      markersArray.arrayContentDidChange(0);
    }
  }
});
