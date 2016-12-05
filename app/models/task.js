import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr(),
	date: DS.attr(),
	description: DS.attr(),
  location: DS.attr(),
  position: DS.attr(),
  markers: DS.attr(),
	created: DS.attr('string', {
		defaultValue: function () {
			return new Date();
		}
	}),
});
