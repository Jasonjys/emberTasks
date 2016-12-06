import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),

  searchTerm: '',
  zoom: 16,

  noTasks: Ember.computed('model.tasks.length', function() {
    return this.get('model.tasks.length');
  }),

  matchingTasks: Ember.computed('model.tasks.@each.title','searchTerm',
                                'model.tasks.@each.description',
                                'model.tasks.@each.date', 
    function() {
      var searchTerm = this.get('searchTerm').toLowerCase();
      return this.get('model.tasks').filter(function(task) {
        return task.get('title').toLowerCase().indexOf(searchTerm) !== -1 || 
          task.get('description').toLowerCase().indexOf(searchTerm) !== -1 || 
          task.get('date').toLowerCase().indexOf(searchTerm) !== -1;
      });
    }),

  taskNotFound: Ember.computed('noTasks', 'matchingTasks.[]', function() {
    let matchTasksLength = this.get('matchingTasks.length');
    return this.get('noTasks') && matchTasksLength === 0;
  }),

  actions: {
    edit: function(task) {
      task.set('isEditing', true);
    },
    save: function(task) {
      task.set('isEditing', false);
      if(!task.get('showDescription')) {
        task.set('description', '');
      }
      if(!task.get('showLocation')) {
        task.set('location', '');
        task.set(
          'markers', [{
            lat: null,
            lng: null
          }]
        )
      }
      task.save();
    },
    deleteTask: function(id) {
      const auth = this.get('firebaseApp').auth();
      var user = auth.currentUser;

      this.set('isConfirmVisible',true);
      let close=confirm("are you sure?");
      if(close){
        this.get('store').findRecord('user', user.uid).then((user) => {
          this.store.findRecord('task', id).then((task) => {
            task.deleteRecord();
            task.save().then(() => {
              user.save();
            });
          });
        });
      }
    },
    didUpdatePlace(task, attr) {
      task.set('position.lat', attr.lat);
      task.set('position.lng', attr.lng);
      task.set('location', attr.place.formatted_address);

      let markersArray = task.get('markers');
      let marker = markersArray.objectAt(0);
      marker.lat = attr.lat;
      marker.lng = attr.lng;

      markersArray.arrayContentDidChange(0);
    }
  }
});
