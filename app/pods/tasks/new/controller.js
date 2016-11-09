import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),

  init: function() {
    this.set('task',  Ember.Object.create());
  },
  taskIsValid: function() {
    console.log("title", this.get('task.title'));
    console.log("date", this.get('task.date'));
    console.log("description", this.get('task.description'));
    var isValid = true;
    ['task.title', 'task.date', 'task.description'].forEach(function(field) {
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
      var newTask = this.store.createRecord('task', {
        title: this.get('task.title'),
        date: this.get('task.date'),
        description: this.get('task.description'),
      });
      console.log("in addTask", newTask.position);

      const auth = this.get('firebaseApp').auth();
      var user = auth.currentUser;

      this.get('store').findRecord('user', user.uid).then((user) => {
        debugger
        user.get('tasks').addObject(newTask);
        newTask.save().then(() => {
          user.save();
        });
      });

      this.setProperties({
        'task.title': '',
        'task.date': '',
        'task.description': ''
      });
      this.transitionToRoute('tasks');
    },
  }
});
