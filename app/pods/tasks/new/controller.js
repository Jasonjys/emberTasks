import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		addTask: function() {
			var title = this.get('title');
			var date = this.get('date');
			var description = this.get('description');

			var newTask = this.store.createRecord('task', {
				title: title,
				date: new Date(date),
				description: description
			});

			newTask.save();

			this.setProperties({
				title: '',
				description: '',
				date: ''
			});

		}
	}
});
