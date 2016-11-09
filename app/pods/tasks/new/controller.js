import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),

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

  init: function() {
    this.set('task',  Ember.Object.create());
  },
  taskIsValid: function() {
    console.log("title", this.get('task.title'));
    console.log("date", this.get('task.date'));
    console.log("description", this.get('task.description'));
    var isValid = true;
    ['task.title', 'task.date', 'task.location','task.description'].forEach(function(field) {
      if (this.get(field) === '' || Ember.typeOf(this.get(field)) === 'undefined') {
        isValid = false;
      }
    }, this);
    return isValid;
  },
  actions: {
    addTask: function() {
      if (!this.taskIsValid()) {
        alert("Missing Info");
        return; 
      }
      // console.log(this.get('task.title'))
      // console.log(this.get('task.date'))
      // console.log(this.get('task.description'))
      //console.log("session.currentUser:", this.get('session.currentUser'));
      var newTask = this.store.createRecord('task', {
        title: this.get('task.title'),
        date: this.get('task.date'),
        location: this.get('task.location'),
        description: this.get('task.description'),
        position: {
          lat:this.get('lat'),
          lng:this.get('lng')
        },
        email: this.get('session.currentUser.email')
      });
      console.log("in addTask", newTask.position);

      //var user = this.get('store').findRecord('user', session.currentUser.email);
      const auth = this.get('firebaseApp').auth();
      var user = auth.currentUser;

      this.get('store').findRecord('user', user.uid).then((user) => {
        user.get('tasks').addObject(newTask);
        newTask.save().then(() => {
          user.save();
        });
      });

      this.setProperties({
        'task.title': '',
        'task.date': '',
        'task.location':'',
        'task.position':'',
        'task.description': ''
      });
      this.transitionToRoute('tasks');
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
