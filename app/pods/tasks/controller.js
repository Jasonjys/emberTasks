import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),

  searchTerm: '',
  zoom: 17,

  noTasks: Ember.computed('model.tasks.length', function() {
    return this.get('model.tasks.length');
  }),

  matchingTasks: Ember.computed('model.tasks.@each.title','searchTerm',
                                'model.tasks.@each.description', 
    function() {
      var searchTerm = this.get('searchTerm').toLowerCase();
      return this.get('model.tasks').filter(function(task) {
        return task.get('title').toLowerCase().indexOf(searchTerm) !==
        -1 || task.get('description').toLowerCase().indexOf(searchTerm) !== -1;
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
      task.save();
    },
    deleteTask: function(id){
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
    }
  }
});
