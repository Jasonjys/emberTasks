import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr(),
	dueDate: DS.attr(),
	description: DS.attr(),
  location: DS.attr(),
  zoom: DS.attr(),
  markers: DS.attr(),
  showDescription: DS.attr(),
  showLocation: DS.attr(),
	created: DS.attr('string', {
		defaultValue: function () {
			return new Date();
		}
	}),
});
