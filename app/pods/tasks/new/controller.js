import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),

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
      var newTask = this.store.createRecord('task', {
        title: this.get('task.title'),
        date: this.get('task.date'),
        description: this.get('task.description'),
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
              'task.date': '',
              'task.description': ''
            });
            this.transitionToRoute('tasks');
          });
        });
      });
    },
  }
});
