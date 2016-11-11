import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr(),
  tasks: DS.hasMany('task', { async: true, inverse: null })
});
