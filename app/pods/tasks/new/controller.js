import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

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
        user: ''
      })
      .then(function(promises) {
        console.log(this.get('task.title'))
        console.log(this.get('task.date'))
        console.log(this.get('task.description'))
        console.log(promises.user)
        var newTask = this.store.createRecord('task', {
          title: this.get('task.title'),
          date: this.get('task.date'),
          description: this.get('task.description'),
          user: this.get('session').currentUser
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
