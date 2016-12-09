import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),

  lat: 56.130366,
  lng: -106.3467709,
  zoom: 3,
  location: '',
  markers: Ember.A([
    {
      id: 'marker1',
      lat: '',
      lng: '',
    }
  ]),

  init: function() {
    this.set('task',  Ember.Object.create());
  },
  taskIsValid: function() {
    var isValid = true;
    ['task.title', 'task.dueDate'].forEach(function(field) {
      if (this.get(field) === '' || Ember.typeOf(this.get(field)) === 'undefined') {
        isValid = false;
      }
    }, this);
    return isValid;
  },
  actions: {
    addTask() {
      if (!this.taskIsValid()) {
        return; 
      }

      const description = this.get('showDescription') ? this.get('task.description') : '';
      const location = this.get('showAutocomplete') ? this.get('location') : '';
      const markers = this.get('showAutocomplete') ? [{
          lat: this.get('lat'),
          lng: this.get('lng')
        }] : '';

      const showDescription = description ? true : false;
      const showLocation = location ? true : false;
      var newTask = this.store.createRecord('task', {
        title: this.get('task.title'),
        dueDate: this.get('task.dueDate'),
        description: description,
        location: location,
        markers: markers,
        showDescription: showDescription,
        showLocation: showLocation
      });

      const auth = this.get('firebaseApp').auth();
      var user = auth.currentUser;

      this.get('store').findRecord('user', user.uid).then((user) => {
        user.get('tasks').addObject(newTask);
        newTask.save().then(() => {
          user.save()
          .then(() => {
            this.setProperties({
              'task.title': '',
              'task.dueDate': '',
              'task.description': '',
              'task.location': '',
              'task.markers': '',
              'showDescription': false,
              'showAutocomplete': false,
              'showMap': false,
              'markers': [{
                lat: '',
                lng: ''
              }],
              'zoom': 3,
              'lat': 56.130366,
              'lng': -106.3467709
            });
            this.transitionToRoute('tasks');
          });
        });
      });
    },
    didUpdatePlace(attr) {
      this.set('lat', attr.lat);
      this.set('lng', attr.lng);
      this.set('zoom', 17);
      this.set('location',attr.place.formatted_address);

      let markersArray = this.get('markers');
      let marker = markersArray.objectAt(0);
      marker.lat = attr.lat;
      marker.lng = attr.lng;

      markersArray.arrayContentDidChange(0);
    }
  }
});
