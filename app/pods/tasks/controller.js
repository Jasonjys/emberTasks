import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    edit: function(task) {
      task.set('isEditing', true);
    },
    save: function(task) {
      task.set('isEditing', false);
      return true;
    },
    deleteTask: function(id){
      this.set('isConfirmVisible',true)
      let close=confirm("are you sure?");
      if(close){
        this.store.findRecord('task',id).then(function(task){
        task.deleteRecord();
        task.save();
      })
      }
    }
  }
});
