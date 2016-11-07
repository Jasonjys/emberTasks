import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr(),
	date: DS.attr(),
	location:DS.attr(),
	position:DS.attr(),
	description: DS.attr(),
	created: DS.attr('string', {
		defaultValue: function () {
			return new Date();
		}
	}),
	email: DS.attr(),
	//user: DS.belongsTo('user', { async: true }),
	user: DS.belongsTo('user', { async: true })
});
