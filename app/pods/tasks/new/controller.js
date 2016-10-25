import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    this.set('task',  Ember.Object.create());
  },
  taskIsValid: function() {
    var isValid = true;
    ['task.title', 'task.date', 'task.description'].forEach(function(field) {
      if (this.get(field) === '') {
        isValid = false;
      }
    }, this);
    return isValid;
  },
  actions: {
    addTask: function() {
      if (!this.taskIsValid()) { return; }
      Ember.RSVP.hash({
        user: 'jason'
      })
      .then(function(promises) {
        var newTask = this.store.createRecord('task', {
          title: this.get('task.title'),
          date: this.get('date.date'),
          description: this.get('date.description'),
          user: promises.user
        });
        newTask.save();
        this.setProperties({
          'task.title': '',
          'task.date': '',
          'task.description': ''
        });
        this.transitionToRoute('tasks');
      }.bind(this));
    }
  }
});
