import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),
	date: DS.attr('date'),
	description: DS.attr('string'),
	created: DS.attr('string', {
		defaultValue: function () {
			return new Date();
		}
	}),
	//user: DS.belongsTo('user', { async: true }),
	user: DS.attr('string')
});
