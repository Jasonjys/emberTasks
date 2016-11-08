import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  tasks: DS.hasMany('task', { async: true, inverse: null })
});
