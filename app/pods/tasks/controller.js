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
                                'model.tasks.@each.dueDate', 
    function() {
      var searchTerm = this.get('searchTerm').toLowerCase();
      return this.get('model.tasks').filter(function(task) {
        return task.get('title').toLowerCase().indexOf(searchTerm) !== -1 || 
          task.get('description').toLowerCase().indexOf(searchTerm) !== -1 || 
          task.get('dueDate').toLowerCase().indexOf(searchTerm) !== -1;
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
      }else{
        if(!task.get('description')) {
          task.set('showDescription', false);
        }
      }
      if(!task.get('showLocation')) {
        task.set('location', '');
        task.set(
          'markers', [{
            lat: '',
            lng: ''
          }]
        );
      }else{
        if(!task.get('location')) {
          task.set('showLocation', false);
        }
      }
      task.save();
    },
    deleteTask: function(task) {
      const auth = this.get('firebaseApp').auth();
      var user = auth.currentUser;

      this.get('store').findRecord('user', user.uid).then((user) => {
        task.deleteRecord();
        task.save().then(() => {
          user.save();
        });
      });
    },
    didUpdatePlace(task, attr) {
      task.set('location', attr.place.formatted_address);
      task.set('markers.firstObject.lat', attr.lat);
      task.set('markers.firstObject.lng', attr.lng);

      task.get('markers').arrayContentDidChange(0);
    },
    openWarningDialog(/* param, event */) {
      this.set('showWarningDialog', true);
    },
    closeWarningDialog(result, task) {
      if (result === 'ok') {
        this.send('deleteTask', task);
      }
      this.set('result', result);
      this.set('showWarningDialog', false);
    },
  }
});
